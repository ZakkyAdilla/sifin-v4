import sql from "@/app/api/utils/sql";

// GET - List all invoices with optional filtering
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const search = searchParams.get("search");

    let query = `
      SELECT 
        id,
        invoice_number,
        customer_name,
        customer_email,
        customer_phone,
        amount,
        description,
        issue_date,
        due_date,
        status,
        payment_method,
        payment_date,
        notes,
        created_at,
        updated_at
      FROM invoices
      WHERE 1=1
    `;

    const params = [];
    let paramCount = 0;

    if (status) {
      paramCount++;
      query += ` AND status = $${paramCount}`;
      params.push(status);
    }

    if (search) {
      paramCount++;
      query += ` AND (
        LOWER(customer_name) LIKE LOWER($${paramCount})
        OR LOWER(invoice_number) LIKE LOWER($${paramCount})
        OR LOWER(description) LIKE LOWER($${paramCount})
      )`;
      params.push(`%${search}%`);
    }

    query += ` ORDER BY created_at DESC`;

    const invoices = await sql(query, params);

    // Calculate summary stats
    const stats = await sql`
      SELECT 
        COUNT(*) FILTER (WHERE status = 'draft') as draft_count,
        COUNT(*) FILTER (WHERE status = 'sent') as sent_count,
        COUNT(*) FILTER (WHERE status = 'paid') as paid_count,
        COUNT(*) FILTER (WHERE status = 'overdue') as overdue_count,
        SUM(amount) FILTER (WHERE status = 'paid') as total_paid,
        SUM(amount) FILTER (WHERE status IN ('sent', 'overdue')) as total_pending
      FROM invoices
    `;

    return Response.json({
      invoices,
      stats: stats[0] || {},
    });
  } catch (error) {
    console.error("Error fetching invoices:", error);
    return Response.json(
      { error: "Failed to fetch invoices" },
      { status: 500 },
    );
  }
}

// POST - Create new invoice
export async function POST(request) {
  try {
    const {
      customer_name,
      customer_email,
      customer_phone,
      customer_address,
      amount,
      description,
      due_date,
      status = "draft",
      payment_method,
      notes,
    } = await request.json();

    // Validate required fields
    if (!customer_name || !amount || !due_date) {
      return Response.json(
        { error: "Customer name, amount, and due date are required" },
        { status: 400 },
      );
    }

    // Generate unique invoice number
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");

    // Get next sequence number for this month
    const lastInvoice = await sql`
      SELECT invoice_number 
      FROM invoices 
      WHERE invoice_number LIKE ${`INV-${year}${month}%`}
      ORDER BY invoice_number DESC 
      LIMIT 1
    `;

    let sequenceNumber = 1;
    if (lastInvoice.length > 0) {
      const lastNumber = lastInvoice[0].invoice_number;
      const lastSequence = parseInt(lastNumber.split("-")[1].slice(6));
      sequenceNumber = lastSequence + 1;
    }

    const invoice_number = `INV-${year}${month}${String(sequenceNumber).padStart(3, "0")}`;

    // Insert new invoice
    const newInvoice = await sql`
      INSERT INTO invoices (
        invoice_number,
        customer_name,
        customer_email,
        customer_phone,
        customer_address,
        amount,
        description,
        due_date,
        status,
        payment_method,
        notes
      ) VALUES (
        ${invoice_number},
        ${customer_name},
        ${customer_email},
        ${customer_phone},
        ${customer_address},
        ${amount},
        ${description},
        ${due_date},
        ${status},
        ${payment_method},
        ${notes}
      )
      RETURNING *
    `;

    return Response.json(newInvoice[0], { status: 201 });
  } catch (error) {
    console.error("Error creating invoice:", error);
    return Response.json(
      { error: "Failed to create invoice" },
      { status: 500 },
    );
  }
}
