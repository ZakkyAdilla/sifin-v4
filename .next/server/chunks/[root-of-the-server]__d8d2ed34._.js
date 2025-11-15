module.exports=[18622,(e,t,r)=>{t.exports=e.x("next/dist/compiled/next-server/app-page-turbo.runtime.prod.js",()=>require("next/dist/compiled/next-server/app-page-turbo.runtime.prod.js"))},56704,(e,t,r)=>{t.exports=e.x("next/dist/server/app-render/work-async-storage.external.js",()=>require("next/dist/server/app-render/work-async-storage.external.js"))},32319,(e,t,r)=>{t.exports=e.x("next/dist/server/app-render/work-unit-async-storage.external.js",()=>require("next/dist/server/app-render/work-unit-async-storage.external.js"))},70406,(e,t,r)=>{t.exports=e.x("next/dist/compiled/@opentelemetry/api",()=>require("next/dist/compiled/@opentelemetry/api"))},93695,(e,t,r)=>{t.exports=e.x("next/dist/shared/lib/no-fallback-error.external.js",()=>require("next/dist/shared/lib/no-fallback-error.external.js"))},316,e=>{"use strict";var t=e.i(47909),r=e.i(74017),a=e.i(96250),n=e.i(59756),s=e.i(61916),o=e.i(14444),i=e.i(10680),u=e.i(69741),l=e.i(16795),d=e.i(87718),c=e.i(95169),p=e.i(47587),R=e.i(66012),E=e.i(70101),h=e.i(26937),v=e.i(10372),m=e.i(93695);e.i(52474);var x=e.i(220),f=e.i(36741);async function g(e){try{let{searchParams:t}=new URL(e.url),r=t.get("status"),a=t.get("search"),n=`
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
    `,s=[],o=0;r&&(o++,n+=` AND status = $${o}`,s.push(r)),a&&(o++,n+=` AND (
        LOWER(customer_name) LIKE LOWER($${o})
        OR LOWER(invoice_number) LIKE LOWER($${o})
        OR LOWER(description) LIKE LOWER($${o})
      )`,s.push(`%${a}%`)),n+=" ORDER BY created_at DESC";let i=await (0,f.default)(n,s),u=await f.default`
      SELECT 
        COUNT(*) FILTER (WHERE status = 'draft') as draft_count,
        COUNT(*) FILTER (WHERE status = 'sent') as sent_count,
        COUNT(*) FILTER (WHERE status = 'paid') as paid_count,
        COUNT(*) FILTER (WHERE status = 'overdue') as overdue_count,
        SUM(amount) FILTER (WHERE status = 'paid') as total_paid,
        SUM(amount) FILTER (WHERE status IN ('sent', 'overdue')) as total_pending
      FROM invoices
    `;return Response.json({invoices:i,stats:u[0]||{}})}catch(e){return console.error("Error fetching invoices:",e),Response.json({error:"Failed to fetch invoices"},{status:500})}}async function _(e){try{let{customer_name:t,customer_email:r,customer_phone:a,customer_address:n,amount:s,description:o,due_date:i,status:u="draft",payment_method:l,notes:d}=await e.json();if(!t||!s||!i)return Response.json({error:"Customer name, amount, and due date are required"},{status:400});let c=new Date,p=c.getFullYear(),R=String(c.getMonth()+1).padStart(2,"0"),E=await f.default`
      SELECT invoice_number 
      FROM invoices 
      WHERE invoice_number LIKE ${`INV-${p}${R}%`}
      ORDER BY invoice_number DESC 
      LIMIT 1
    `,h=1;if(E.length>0){let e=E[0].invoice_number;h=parseInt(e.split("-")[1].slice(6))+1}let v=`INV-${p}${R}${String(h).padStart(3,"0")}`,m=await f.default`
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
        ${v},
        ${t},
        ${r},
        ${a},
        ${n},
        ${s},
        ${o},
        ${i},
        ${u},
        ${l},
        ${d}
      )
      RETURNING *
    `;return Response.json(m[0],{status:201})}catch(e){return console.error("Error creating invoice:",e),Response.json({error:"Failed to create invoice"},{status:500})}}e.s(["GET",()=>g,"POST",()=>_],78835);var w=e.i(78835);let C=new t.AppRouteRouteModule({definition:{kind:r.RouteKind.APP_ROUTE,page:"/api/invoices/route",pathname:"/api/invoices",filename:"route",bundlePath:""},distDir:".next",relativeProjectDir:"",resolvedPagePath:"[project]/app/api/invoices/route.js",nextConfigOutput:"",userland:w}),{workAsyncStorage:T,workUnitAsyncStorage:O,serverHooks:y}=C;function N(){return(0,a.patchFetch)({workAsyncStorage:T,workUnitAsyncStorage:O})}async function $(e,t,a){C.isDev&&(0,n.addRequestMeta)(e,"devRequestTimingInternalsEnd",process.hrtime.bigint());let f="/api/invoices/route";f=f.replace(/\/index$/,"")||"/";let g=await C.prepare(e,t,{srcPage:f,multiZoneDraftMode:!1});if(!g)return t.statusCode=400,t.end("Bad Request"),null==a.waitUntil||a.waitUntil.call(a,Promise.resolve()),null;let{buildId:_,params:w,nextConfig:T,parsedUrl:O,isDraftMode:y,prerenderManifest:N,routerServerContext:$,isOnDemandRevalidate:b,revalidateOnlyGenerated:I,resolvedPathname:S,clientReferenceManifest:A,serverActionsManifest:L}=g,H=(0,u.normalizeAppPath)(f),U=!!(N.dynamicRoutes[H]||N.routes[S]),P=async()=>((null==$?void 0:$.render404)?await $.render404(e,t,O,!1):t.end("This page could not be found"),null);if(U&&!y){let e=!!N.routes[S],t=N.dynamicRoutes[H];if(t&&!1===t.fallback&&!e){if(T.experimental.adapterPath)return await P();throw new m.NoFallbackError}}let M=null;!U||C.isDev||y||(M="/index"===(M=S)?"/":M);let j=!0===C.isDev||!U,q=U&&!j;L&&A&&(0,o.setReferenceManifestsSingleton)({page:f,clientReferenceManifest:A,serverActionsManifest:L,serverModuleMap:(0,i.createServerModuleMap)({serverActionsManifest:L})});let D=e.method||"GET",F=(0,s.getTracer)(),k=F.getActiveScopeSpan(),W={params:w,prerenderManifest:N,renderOpts:{experimental:{authInterrupts:!!T.experimental.authInterrupts},cacheComponents:!!T.cacheComponents,supportsDynamicResponse:j,incrementalCache:(0,n.getRequestMeta)(e,"incrementalCache"),cacheLifeProfiles:T.cacheLife,waitUntil:a.waitUntil,onClose:e=>{t.on("close",e)},onAfterTaskError:void 0,onInstrumentationRequestError:(t,r,a)=>C.onRequestError(e,t,a,$)},sharedContext:{buildId:_}},K=new l.NodeNextRequest(e),B=new l.NodeNextResponse(t),V=d.NextRequestAdapter.fromNodeNextRequest(K,(0,d.signalFromNodeResponse)(t));try{let o=async e=>C.handle(V,W).finally(()=>{if(!e)return;e.setAttributes({"http.status_code":t.statusCode,"next.rsc":!1});let r=F.getRootSpanAttributes();if(!r)return;if(r.get("next.span_type")!==c.BaseServerSpan.handleRequest)return void console.warn(`Unexpected root span type '${r.get("next.span_type")}'. Please report this Next.js issue https://github.com/vercel/next.js`);let a=r.get("next.route");if(a){let t=`${D} ${a}`;e.setAttributes({"next.route":a,"http.route":a,"next.span_name":t}),e.updateName(t)}else e.updateName(`${D} ${f}`)}),i=!!(0,n.getRequestMeta)(e,"minimalMode"),u=async n=>{var s,u;let l=async({previousCacheEntry:r})=>{try{if(!i&&b&&I&&!r)return t.statusCode=404,t.setHeader("x-nextjs-cache","REVALIDATED"),t.end("This page could not be found"),null;let s=await o(n);e.fetchMetrics=W.renderOpts.fetchMetrics;let u=W.renderOpts.pendingWaitUntil;u&&a.waitUntil&&(a.waitUntil(u),u=void 0);let l=W.renderOpts.collectedTags;if(!U)return await (0,R.sendResponse)(K,B,s,W.renderOpts.pendingWaitUntil),null;{let e=await s.blob(),t=(0,E.toNodeOutgoingHttpHeaders)(s.headers);l&&(t[v.NEXT_CACHE_TAGS_HEADER]=l),!t["content-type"]&&e.type&&(t["content-type"]=e.type);let r=void 0!==W.renderOpts.collectedRevalidate&&!(W.renderOpts.collectedRevalidate>=v.INFINITE_CACHE)&&W.renderOpts.collectedRevalidate,a=void 0===W.renderOpts.collectedExpire||W.renderOpts.collectedExpire>=v.INFINITE_CACHE?void 0:W.renderOpts.collectedExpire;return{value:{kind:x.CachedRouteKind.APP_ROUTE,status:s.status,body:Buffer.from(await e.arrayBuffer()),headers:t},cacheControl:{revalidate:r,expire:a}}}}catch(t){throw(null==r?void 0:r.isStale)&&await C.onRequestError(e,t,{routerKind:"App Router",routePath:f,routeType:"route",revalidateReason:(0,p.getRevalidateReason)({isStaticGeneration:q,isOnDemandRevalidate:b})},$),t}},d=await C.handleResponse({req:e,nextConfig:T,cacheKey:M,routeKind:r.RouteKind.APP_ROUTE,isFallback:!1,prerenderManifest:N,isRoutePPREnabled:!1,isOnDemandRevalidate:b,revalidateOnlyGenerated:I,responseGenerator:l,waitUntil:a.waitUntil,isMinimalMode:i});if(!U)return null;if((null==d||null==(s=d.value)?void 0:s.kind)!==x.CachedRouteKind.APP_ROUTE)throw Object.defineProperty(Error(`Invariant: app-route received invalid cache entry ${null==d||null==(u=d.value)?void 0:u.kind}`),"__NEXT_ERROR_CODE",{value:"E701",enumerable:!1,configurable:!0});i||t.setHeader("x-nextjs-cache",b?"REVALIDATED":d.isMiss?"MISS":d.isStale?"STALE":"HIT"),y&&t.setHeader("Cache-Control","private, no-cache, no-store, max-age=0, must-revalidate");let c=(0,E.fromNodeOutgoingHttpHeaders)(d.value.headers);return i&&U||c.delete(v.NEXT_CACHE_TAGS_HEADER),!d.cacheControl||t.getHeader("Cache-Control")||c.get("Cache-Control")||c.set("Cache-Control",(0,h.getCacheControlHeader)(d.cacheControl)),await (0,R.sendResponse)(K,B,new Response(d.value.body,{headers:c,status:d.value.status||200})),null};k?await u(k):await F.withPropagatedContext(e.headers,()=>F.trace(c.BaseServerSpan.handleRequest,{spanName:`${D} ${f}`,kind:s.SpanKind.SERVER,attributes:{"http.method":D,"http.target":e.url}},u))}catch(t){if(t instanceof m.NoFallbackError||await C.onRequestError(e,t,{routerKind:"App Router",routePath:H,routeType:"route",revalidateReason:(0,p.getRevalidateReason)({isStaticGeneration:q,isOnDemandRevalidate:b})}),U)throw t;return await (0,R.sendResponse)(K,B,new Response(null,{status:500})),null}}e.s(["handler",()=>$,"patchFetch",()=>N,"routeModule",()=>C,"serverHooks",()=>y,"workAsyncStorage",()=>T,"workUnitAsyncStorage",()=>O],316)}];

//# sourceMappingURL=%5Broot-of-the-server%5D__d8d2ed34._.js.map