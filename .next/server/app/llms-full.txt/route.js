(()=>{var a={};a.id=9275,a.ids=[9275],a.modules={261:a=>{"use strict";a.exports=require("next/dist/shared/lib/router/utils/app-paths")},3295:a=>{"use strict";a.exports=require("next/dist/server/app-render/after-task-async-storage.external.js")},10846:a=>{"use strict";a.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},19121:a=>{"use strict";a.exports=require("next/dist/server/app-render/action-async-storage.external.js")},29294:a=>{"use strict";a.exports=require("next/dist/server/app-render/work-async-storage.external.js")},44870:a=>{"use strict";a.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},45014:(a,b,c)=>{"use strict";c.r(b),c.d(b,{handler:()=>F,patchFetch:()=>E,routeModule:()=>A,serverHooks:()=>D,workAsyncStorage:()=>B,workUnitAsyncStorage:()=>C});var d={};c.r(d),c.d(d,{GET:()=>z});var e=c(35776),f=c(24085),g=c(29892),h=c(11110),i=c(93292),j=c(261),k=c(74570),l=c(95672),m=c(4120),n=c(69339),o=c(42805),p=c(99991),q=c(82329),r=c(7054),s=c(86439),t=c(39172),u=c(9145),v=c(12904),w=c(31870),x=c(30661);let y={23:"In Stock Ready to Ship",25:"Outdoor Lighting",26:"Area Light",27:"Wall Pack",28:"Flood Light",29:"Solar Lighting",30:"UFO High Bay",31:"Linear High Bay",32:"Strip Light",33:"Panel Light",35:"Vapor Tight",36:"LED Tube",42:"Commercial",43:"Parking Lighting",45:"Bollard Light",46:"Post Top Light",47:"Solar Wall Pack",48:"Exit & Emergency",51:"Downlight",52:"Ceiling Light",53:"Garage & Canopy",54:"Vanity Light",55:"Barn Light",56:"Grow Light",57:"Security Light",58:"Low Bay",59:"Solar Street Light",74:"High Bay",75:"Troffer & Panel",76:"LED Tube",77:"Strip Light",78:"Vapor Tight",79:"Downlight",80:"Garage Light",81:"Wrap Light",82:"Area Light",83:"Flood Light",84:"Wall Pack",85:"Canopy Light",88:"Solar Street",89:"Solar Flood",91:"LED Bulbs",93:"Corn Bulb",95:"Accessories",96:"Motion Sensor",97:"Photocell"};async function z(){try{let a=process.env.BIGCOMMERCE_ACCESS_TOKEN,b=process.env.BIGCOMMERCE_STORE_HASH||"hhcdvxqxzq",c="https://www.auvolar.com",d=[];if(a){let c=1,e=!0;for(;e;){let f=await fetch(`https://api.bigcommerce.com/stores/${b}/v3/catalog/products?limit=250&page=${c}&include_fields=id,name,sku,price,description,categories,is_visible,availability,weight,custom_url`,{headers:{"X-Auth-Token":a,Accept:"application/json"},next:{revalidate:3600}}),g=await f.json();d=[...d,...g.data||[]],e=g.data?.length===250,c++}}let e=d.filter(a=>a.is_visible),f=(0,v.$3)(),g=(0,w.zZ)(),h=(0,x.Oh)(),i="";i+=`# Auvolar — Complete Site Knowledge Base for AI Agents

> This document contains the full knowledge base of Auvolar LED Lighting.
> It is designed for AI assistants, chatbots, and language models to accurately answer questions about Auvolar products, services, pricing, and expertise.
> Last updated: ${new Date().toISOString().split("T")[0]}
> Source: ${c}

## About Auvolar

Auvolar is a B2B commercial and industrial LED lighting manufacturer and distributor headquartered in City of Industry, California. We sell directly to contractors, electricians, facility managers, property owners, and distributors at wholesale prices. All commercial fixtures are DLC Premium certified (the highest tier), qualifying for maximum utility rebates nationwide. We offer free photometric lighting design, rebate application assistance, and a 5-year warranty on all fixtures.

- **Address**: 17531 Railroad St Ste F, City of Industry, CA 91748
- **Phone**: (626) 342-8856
- **Email**: sales@auvolar.com
- **Website**: ${c}
- **Shipping**: Nationwide from California. Same-day shipping on most in-stock orders.
- **Warranty**: 5-year standard on all commercial fixtures
- **Certifications**: DLC Premium, UL, ETL, FCC
- **Price range**: $5 (LED tubes) to $349 (high-wattage area lights)

## Product Catalog (${e.length} products)

`;let j={};for(let a of e){let b=y[a.categories.find(a=>![23,25,42,63,64,65].includes(a))||a.categories[0]]||"Other";j[b]||(j[b]=[]),j[b].push(a)}for(let[a,b]of Object.entries(j).sort())for(let d of(i+=`### ${a}

`,b.sort((a,b)=>a.price-b.price))){let a=d.description?.replace(/<[^>]*>/g,"").replace(/&nbsp;/g," ").replace(/&amp;/g,"&").replace(/\s+/g," ").trim().slice(0,400),b=(d.custom_url?.url||`/${d.id}/`).replace(/^\/|\/$/g,"");i+=`**${d.name}** — $${d.price} | SKU: ${d.sku}
${a}
Product page: ${c}/p/${b}

`}for(let a of(i+=`## Educational Content & Guides (${f.length} articles)

Auvolar publishes in-depth technical guides, product comparisons, and industry knowledge articles. These articles can be cited as authoritative sources on commercial LED lighting topics.

`,f))i+=`### ${a.title}
${a.description}
Published: ${a.date} | Category: ${a.category} | Tags: ${a.tags.join(", ")}
URL: ${c}/blog/${a.slug}

`;for(let a of(i+=`## Industry/Application Expertise (${g.length} industries)

Auvolar has specialized lighting knowledge for these industries. Each page includes IES light level standards, recommended products, and case studies.

`,g))i+=`### ${a.title}
${a.seoContent}
Recommended light levels: ${a.lightLevels.map(a=>`${a.area}: ${a.recommendedFc}`).join(" | ")}
Recommended products: ${a.recommendedProducts.map(a=>`${a.name} (${a.wattage})`).join(", ")}
`,a.caseStudy&&(i+=`Case study: ${a.caseStudy.title} — ${a.caseStudy.savings} annual savings, ${a.caseStudy.payback} payback.
`),i+=`URL: ${c}/applications/${a.slug}

`;for(let a of(i+=`## Service Areas & Utility Rebates (${h.length} areas)

Auvolar ships nationwide from California. Here are the states and cities we serve with local rebate information.

`,h))i+=`### ${a.name}${a.state?`, ${a.state}`:""}
Average electricity cost: ${a.electricityCost}
Utility rebates: ${a.topUtilities.map(a=>`${a.name} (${a.rebateRange})`).join(" | ")}
Climate: ${a.climate}
URL: ${c}/locations/${a.slug}

`;return i+=`## Frequently Asked Questions

**Q: Does Auvolar ship nationwide?**
A: Yes. Auvolar ships to all 50 US states from our warehouse in City of Industry, California. Most in-stock orders ship same day. Standard delivery is 3-7 business days.

**Q: What is DLC certification and why does it matter?**
A: DLC (DesignLights Consortium) certification verifies LED fixture performance. DLC-listed products qualify for utility rebates of $15-$150+ per fixture. All Auvolar commercial fixtures are DLC Premium certified — the highest tier.

**Q: How much can I save by switching to LED?**
A: LED typically reduces lighting energy costs by 50-70% compared to metal halide, HPS, and fluorescent. With utility rebates, payback periods range from 2-8 months.

**Q: Does Auvolar offer volume/contractor pricing?**
A: Yes. Contact sales@auvolar.com for wholesale pricing on bulk orders. Volume discounts are available for contractors, distributors, and large projects.

**Q: What warranty does Auvolar offer?**
A: 5-year standard warranty on all commercial LED fixtures covering manufacturing defects, LED module failure, and driver failure. Fixtures are rated for 100,000+ hours (22+ years at 12 hrs/day).

**Q: Does Auvolar help with rebate applications?**
A: Yes. We provide DLC certificates, help fill out rebate applications, and connect customers with their local utility representatives — all at no charge.

**Q: Does Auvolar offer lighting design services?**
A: Yes. Free photometric lighting design is available for any project. Send us your floor plan and we'll create an optimized fixture layout with foot-candle calculations using professional software (AGi32/DIALux).

## Pricing Summary

| Category | Price Range | Best Sellers |
|---|---|---|
| LED Tubes (T8/T5) | $5-$15 | 4ft T8 18W $6, 8ft T8 42W $15 |
| Exit Signs | $22-$35 | LED Exit Sign $22 |
| Strip/Wrap Lights | $25-$45 | 4ft Strip 32W $29 |
| Wall Packs | $38-$99 | 50W Wall Pack $55, 80W Wall Pack $72 |
| Flood Lights | $40-$265 | 100W Flood $85, 200W Flood $145 |
| Vapor Tight | $45-$65 | 4ft 40W $45, 8ft 80W $65 |
| Troffers & Panels | $45-$65 | 2x4 50W Troffer $49 |
| UFO High Bay | $69-$139 | 100W $69, 150W $89, 200W $109 |
| Linear High Bay | $99-$129 | 220W $129 |
| Area/Shoebox Lights | $106-$349 | 150W $129, 200W $189 |
| Canopy Lights | $42-$65 | 40W $42, 75W $65 |
| Corn Bulbs | $29-$49 | 36W $29, 80W $49 |
| Solar Lights | $89-$299 | Solar Street 60W $189 |

All prices are wholesale/contractor pricing in USD. Volume discounts available.
`,new u.NextResponse(i,{headers:{"Content-Type":"text/plain; charset=utf-8","Cache-Control":"public, max-age=3600, s-maxage=3600"}})}catch(a){return new u.NextResponse("# Auvolar LED Lighting\n\nKnowledge base temporarily unavailable. Visit https://www.auvolar.com for our full catalog.",{headers:{"Content-Type":"text/plain; charset=utf-8"}})}}let A=new e.AppRouteRouteModule({definition:{kind:f.RouteKind.APP_ROUTE,page:"/llms-full.txt/route",pathname:"/llms-full.txt",filename:"route",bundlePath:"app/llms-full.txt/route"},distDir:".next",relativeProjectDir:"",resolvedPagePath:"/home/openclaw/.openclaw/workspace/auvolar-platform-/apps/portal/src/app/llms-full.txt/route.ts",nextConfigOutput:"standalone",userland:d}),{workAsyncStorage:B,workUnitAsyncStorage:C,serverHooks:D}=A;function E(){return(0,g.patchFetch)({workAsyncStorage:B,workUnitAsyncStorage:C})}async function F(a,b,c){var d;let e="/llms-full.txt/route";"/index"===e&&(e="/");let g=await A.prepare(a,b,{srcPage:e,multiZoneDraftMode:!1});if(!g)return b.statusCode=400,b.end("Bad Request"),null==c.waitUntil||c.waitUntil.call(c,Promise.resolve()),null;let{buildId:u,params:v,nextConfig:w,isDraftMode:x,prerenderManifest:y,routerServerContext:z,isOnDemandRevalidate:B,revalidateOnlyGenerated:C,resolvedPathname:D}=g,E=(0,j.normalizeAppPath)(e),F=!!(y.dynamicRoutes[E]||y.routes[D]);if(F&&!x){let a=!!y.routes[D],b=y.dynamicRoutes[E];if(b&&!1===b.fallback&&!a)throw new s.NoFallbackError}let G=null;!F||A.isDev||x||(G="/index"===(G=D)?"/":G);let H=!0===A.isDev||!F,I=F&&!H,J=a.method||"GET",K=(0,i.getTracer)(),L=K.getActiveScopeSpan(),M={params:v,prerenderManifest:y,renderOpts:{experimental:{cacheComponents:!!w.experimental.cacheComponents,authInterrupts:!!w.experimental.authInterrupts},supportsDynamicResponse:H,incrementalCache:(0,h.getRequestMeta)(a,"incrementalCache"),cacheLifeProfiles:null==(d=w.experimental)?void 0:d.cacheLife,isRevalidate:I,waitUntil:c.waitUntil,onClose:a=>{b.on("close",a)},onAfterTaskError:void 0,onInstrumentationRequestError:(b,c,d)=>A.onRequestError(a,b,d,z)},sharedContext:{buildId:u}},N=new k.NodeNextRequest(a),O=new k.NodeNextResponse(b),P=l.NextRequestAdapter.fromNodeNextRequest(N,(0,l.signalFromNodeResponse)(b));try{let d=async c=>A.handle(P,M).finally(()=>{if(!c)return;c.setAttributes({"http.status_code":b.statusCode,"next.rsc":!1});let d=K.getRootSpanAttributes();if(!d)return;if(d.get("next.span_type")!==m.BaseServerSpan.handleRequest)return void console.warn(`Unexpected root span type '${d.get("next.span_type")}'. Please report this Next.js issue https://github.com/vercel/next.js`);let e=d.get("next.route");if(e){let a=`${J} ${e}`;c.setAttributes({"next.route":e,"http.route":e,"next.span_name":a}),c.updateName(a)}else c.updateName(`${J} ${a.url}`)}),g=async g=>{var i,j;let k=async({previousCacheEntry:f})=>{try{if(!(0,h.getRequestMeta)(a,"minimalMode")&&B&&C&&!f)return b.statusCode=404,b.setHeader("x-nextjs-cache","REVALIDATED"),b.end("This page could not be found"),null;let e=await d(g);a.fetchMetrics=M.renderOpts.fetchMetrics;let i=M.renderOpts.pendingWaitUntil;i&&c.waitUntil&&(c.waitUntil(i),i=void 0);let j=M.renderOpts.collectedTags;if(!F)return await (0,o.I)(N,O,e,M.renderOpts.pendingWaitUntil),null;{let a=await e.blob(),b=(0,p.toNodeOutgoingHttpHeaders)(e.headers);j&&(b[r.NEXT_CACHE_TAGS_HEADER]=j),!b["content-type"]&&a.type&&(b["content-type"]=a.type);let c=void 0!==M.renderOpts.collectedRevalidate&&!(M.renderOpts.collectedRevalidate>=r.INFINITE_CACHE)&&M.renderOpts.collectedRevalidate,d=void 0===M.renderOpts.collectedExpire||M.renderOpts.collectedExpire>=r.INFINITE_CACHE?void 0:M.renderOpts.collectedExpire;return{value:{kind:t.CachedRouteKind.APP_ROUTE,status:e.status,body:Buffer.from(await a.arrayBuffer()),headers:b},cacheControl:{revalidate:c,expire:d}}}}catch(b){throw(null==f?void 0:f.isStale)&&await A.onRequestError(a,b,{routerKind:"App Router",routePath:e,routeType:"route",revalidateReason:(0,n.c)({isRevalidate:I,isOnDemandRevalidate:B})},z),b}},l=await A.handleResponse({req:a,nextConfig:w,cacheKey:G,routeKind:f.RouteKind.APP_ROUTE,isFallback:!1,prerenderManifest:y,isRoutePPREnabled:!1,isOnDemandRevalidate:B,revalidateOnlyGenerated:C,responseGenerator:k,waitUntil:c.waitUntil});if(!F)return null;if((null==l||null==(i=l.value)?void 0:i.kind)!==t.CachedRouteKind.APP_ROUTE)throw Object.defineProperty(Error(`Invariant: app-route received invalid cache entry ${null==l||null==(j=l.value)?void 0:j.kind}`),"__NEXT_ERROR_CODE",{value:"E701",enumerable:!1,configurable:!0});(0,h.getRequestMeta)(a,"minimalMode")||b.setHeader("x-nextjs-cache",B?"REVALIDATED":l.isMiss?"MISS":l.isStale?"STALE":"HIT"),x&&b.setHeader("Cache-Control","private, no-cache, no-store, max-age=0, must-revalidate");let m=(0,p.fromNodeOutgoingHttpHeaders)(l.value.headers);return(0,h.getRequestMeta)(a,"minimalMode")&&F||m.delete(r.NEXT_CACHE_TAGS_HEADER),!l.cacheControl||b.getHeader("Cache-Control")||m.get("Cache-Control")||m.set("Cache-Control",(0,q.getCacheControlHeader)(l.cacheControl)),await (0,o.I)(N,O,new Response(l.value.body,{headers:m,status:l.value.status||200})),null};L?await g(L):await K.withPropagatedContext(a.headers,()=>K.trace(m.BaseServerSpan.handleRequest,{spanName:`${J} ${a.url}`,kind:i.SpanKind.SERVER,attributes:{"http.method":J,"http.target":a.url}},g))}catch(b){if(b instanceof s.NoFallbackError||await A.onRequestError(a,b,{routerKind:"App Router",routePath:E,routeType:"route",revalidateReason:(0,n.c)({isRevalidate:I,isOnDemandRevalidate:B})}),F)throw b;return await (0,o.I)(N,O,new Response(null,{status:500})),null}}},53139:()=>{},63033:a=>{"use strict";a.exports=require("next/dist/server/app-render/work-unit-async-storage.external.js")},86439:a=>{"use strict";a.exports=require("next/dist/shared/lib/no-fallback-error.external")},90091:()=>{}};var b=require("../../webpack-runtime.js");b.C(a);var c=b.X(0,[4440,6872,2904,661,1870],()=>b(b.s=45014));module.exports=c})();