import sql from "../../utils/sql.js";

// GET - Get single invoice by ID
export async function GET(request, { params }) {
  try {
    const { id } = params;

    const invoice = await sql`
      SELECT 
        id,
        invoice_number,
        customer_name,
        customer_email,
        customer_phone,
        customer_address,
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
      WHERE id = ${id}
    `;

    if (invoice.length === 0) {
      return Response.json({ error: "Invoice not found" }, { status: 404 });
    }

    return Response.json(invoice[0]);
  } catch (error) {
    console.error("Error fetching invoice:", error);
    return Response.json({ error: "Failed to fetch invoice" }, { status: 500 });
  }
}

// PUT - Update invoice
export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const updateData = await request.json();

    // Build dynamic update query
    const updateFields = [];
    const updateValues = [];
    let paramCount = 0;

    // List of allowed fields to update
    const allowedFields = [
      "customer_name",
      "customer_email",
      "customer_phone",
      "customer_address",
      "amount",
      "description",
      "due_date",
      "status",
      "payment_method",
      "payment_date",
      "notes",
    ];

    for (const field of allowedFields) {
      if (updateData.hasOwnProperty(field)) {
        paramCount++;
        updateFields.push(`${field} = $${paramCount}`);
        updateValues.push(updateData[field]);
      }
    }

    if (updateFields.length === 0) {
      return Response.json(
        { error: "No valid fields to update" },
        { status: 400 },
      );
    }

    // Add updated_at timestamp
    paramCount++;
    updateFields.push(`updated_at = $${paramCount}`);
    updateValues.push(new Date());

    // Add ID parameter for WHERE clause
    paramCount++;
    updateValues.push(id);

    const updateQuery = `
      UPDATE invoices 
      SET ${updateFields.join(", ")}
      WHERE id = $${paramCount}
      RETURNING *
    `;

    const updatedInvoice = await sql(updateQuery, updateValues);

    if (updatedInvoice.length === 0) {
      return Response.json({ error: "Invoice not found" }, { status: 404 });
    }

    return Response.json(updatedInvoice[0]);
  } catch (error) {
    console.error("Error updating invoice:", error);
    return Response.json(
      { error: "Failed to update invoice" },
      { status: 500 },
    );
  }
}

// DELETE - Delete invoice
export async function DELETE(request, { params }) {
  try {
    const { id } = params;

    const deletedInvoice = await sql`
      DELETE FROM invoices 
      WHERE id = ${id}
      RETURNING invoice_number, customer_name
    `;

    if (deletedInvoice.length === 0) {
      return Response.json({ error: "Invoice not found" }, { status: 404 });
    }

    return Response.json({
      message: "Invoice deleted successfully",
      deleted_invoice: deletedInvoice[0],
    });
  } catch (error) {
    console.error("Error deleting invoice:", error);
    return Response.json(
      { error: "Failed to delete invoice" },
      { status: 500 },
    );
  }
}
