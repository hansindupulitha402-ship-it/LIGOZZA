
const PRODUCTS=[
{id:'hoodie',name:'LIGOZZA Hoodie',price:4500,img:'assets/hoodie.svg',desc:'Heavyweight everyday hoodie with a clean LIGOZZA chest mark, soft brushed interior and relaxed modern fit.'},
{id:'tee',name:'LIGOZZA Essential Tee',price:2800,img:'assets/tee.svg',desc:'Minimal premium cotton tee with a structured silhouette for effortless daily styling.'},
{id:'cap',name:'LIGOZZA Core Cap',price:1500,img:'assets/cap.svg',desc:'Six-panel everyday cap with adjustable back strap and embroidered LIGOZZA mark.'},
{id:'watch',name:'LIGOZZA Chrono Watch',price:6900,img:'assets/watch.svg',desc:'Minimal chronograph-inspired watch with a dark case and clean dial.'},
{id:'bag',name:'LIGOZZA Utility Backpack',price:5500,img:'assets/bag.svg',desc:'Streamlined utility backpack for work, campus and everyday movement.'},
{id:'sneakers',name:'LIGOZZA Street Sneakers',price:7900,img:'assets/sneakers.svg',desc:'Low-profile street sneakers with a neutral cream finish.'}
];
let cart=JSON.parse(localStorage.getItem('ligozza-cart')||'[]');
const money=n=>'Rs. '+n.toLocaleString('en-LK');
function save(){localStorage.setItem('ligozza-cart',JSON.stringify(cart));updateBadge()}
function updateBadge(){document.querySelectorAll('[data-cart-count]').forEach(x=>x.textContent=cart.reduce((a,b)=>a+b.qty,0))}
function add(id){let p=PRODUCTS.find(x=>x.id===id),i=cart.findIndex(x=>x.id===id);if(i>-1)cart[i].qty++;else cart.push({...p,qty:1});save();toast('Added to cart')}
function change(id,d){let i=cart.findIndex(x=>x.id===id);if(i<0)return;cart[i].qty+=d;if(cart[i].qty<1)cart.splice(i,1);save();renderCart()}
function removeItem(id){cart=cart.filter(x=>x.id!==id);save();renderCart()}
function toast(t){let e=document.createElement('div');e.textContent=t;e.style='position:fixed;right:20px;bottom:20px;background:#111;color:#fff;padding:14px 18px;border-radius:12px;z-index:50';document.body.append(e);setTimeout(()=>e.remove(),1800)}
function openDrawer(){document.querySelector('.drawer')?.classList.toggle('open')}
function card(p){return `<article class="product"><a href="product.html?id=${p.id}"><img src="${p.img}" alt="${p.name}"></a><div class="pad"><div class="muted">LIGOZZA COLLECTION</div><h3>${p.name}</h3><div class="row"><span class="price">${money(p.price)}</span><button class="mini-btn" onclick="event.preventDefault();add('${p.id}')">Add to cart</button></div></div></article>`}
function renderProducts(el,items=PRODUCTS){if(el)el.innerHTML=items.map(card).join('')}
function productPage(){let params=new URLSearchParams(location.search),id=params.get('id'),p=PRODUCTS.find(x=>x.id===id),e=document.querySelector('#product-detail');if(!e)return;if(!id){renderProducts(document.querySelector('#product-grid'));return;}e.innerHTML=`<div class="detail-img"><img src="${p.img}" alt="${p.name}"></div><div><div class="eyebrow">LIGOZZA / ${p.id}</div><h1>${p.name}</h1><div class="rating">★★★★★ <span class="muted">(24 reviews)</span></div><h2>${money(p.price)}</h2><p class="muted" style="font-size:16px;line-height:1.8">${p.desc}</p><h4>Size</h4><div class="option">${['S','M','L','XL','XXL'].map((x,i)=>`<button class="${i===2?'selected':''}" onclick="this.parentNode.querySelectorAll('button').forEach(b=>b.classList.remove('selected'));this.classList.add('selected')">${x}</button>`).join('')}</div><div style="margin-top:25px"><button class="qty" onclick="changeLocal(-1)">−</button><span id="localqty">1</span><button class="qty" onclick="changeLocal(1)">+</button><button class="btn" onclick="add('${p.id}')">Add to Cart →</button></div><hr style="border:0;border-top:1px solid #eee;margin:30px 0"><p class="muted">Free shipping on orders over Rs. 5,000 · Easy returns within 7 days · Secure checkout</p></div>`}
let localQty=1;function changeLocal(d){localQty=Math.max(1,localQty+d);let e=document.querySelector('#localqty');if(e)e.textContent=localQty}
function renderCart(){let list=document.querySelector('#cart-list'),sum=document.querySelector('#cart-summary');if(!list)return;if(!cart.length){list.innerHTML='<div class="empty"><h2>Your cart is empty</h2><p class="muted">Add something from the collection.</p><a class="btn" href="shop.html">Shop now</a></div>';sum.innerHTML='';return}list.innerHTML=cart.map(p=>`<div class="cart-row"><img src="${p.img}"><div><b>${p.name}</b><div class="muted">${money(p.price)}</div></div><div><button class="mini-btn" onclick="change('${p.id}',-1)">−</button> ${p.qty} <button class="mini-btn" onclick="change('${p.id}',1)">+</button></div><button class="mini-btn remove" onclick="removeItem('${p.id}')">Remove</button></div>`).join('');let sub=cart.reduce((a,p)=>a+p.price*p.qty,0),ship=sub>=5000?0:450;sum.innerHTML=`<h2>Summary</h2><p>Subtotal <b style="float:right">${money(sub)}</b></p><p>Shipping <b style="float:right">${ship?money(ship):'Free'}</b></p><hr><h3>Total <b style="float:right">${money(sub+ship)}</b></h3><button class="btn" style="width:100%;justify-content:center" onclick="toast('Checkout demo — connect your payment gateway to go live.')">Proceed to Checkout</button>`}
document.addEventListener('DOMContentLoaded',()=>{document.querySelector('.menu-btn')?.addEventListener('click',openDrawer);renderProducts(document.querySelector('#product-grid'));renderProducts(document.querySelector('#best-grid'),PRODUCTS.slice(0,4));productPage();renderCart();updateBadge()})

function renderCategoryPage(){
  const e=document.querySelector('#category-products'); if(!e)return;
  const cat=new URLSearchParams(location.search).get('cat');
  const labels={men:'Men',women:'Women',accessories:'Accessories',new:'New Arrivals'};
  const heading=document.querySelector('#category-heading');
  if(!cat){heading.textContent='All categories';renderProducts(e);return;}
  heading.textContent=labels[cat]||'Category';
  let items=PRODUCTS;
  if(cat==='men') items=PRODUCTS.filter(p=>['tee','hoodie','sneakers'].includes(p.id));
  if(cat==='women') items=PRODUCTS.filter(p=>['hoodie','tee','sneakers'].includes(p.id));
  if(cat==='accessories') items=PRODUCTS.filter(p=>['watch','bag','cap'].includes(p.id));
  if(cat==='new') items=PRODUCTS.filter(p=>['cap','sneakers','watch'].includes(p.id));
  renderProducts(e,items);
}
document.addEventListener('DOMContentLoaded',renderCategoryPage);

document.addEventListener('DOMContentLoaded',()=>{
  const e=document.querySelector('#category-products');
  if(e && window.LIGOZZA_CATEGORY_IDS){
    const items=window.LIGOZZA_CATEGORY_IDS.map(id=>PRODUCTS.find(p=>p.id===id)).filter(Boolean);
    renderProducts(e,items);
  }
});
