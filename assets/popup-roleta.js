(() => {
  'use strict';
  const asset = '/__l5e/assets-v1/937aa2f1-ee56-4b26-b5a8-50cc5d21674f/hero-deveu.webp';
  const groups = [
    {label:'Smartphones',icon:'📱',prizes:['iPhone 15','Galaxy S24','Xiaomi Redmi Note']},
    {label:'Apple',icon:'🎧',prizes:['AirPods Pro','iPad','MacBook Air']},
    {label:'JBL',icon:'🎵',prizes:['Fone JBL Tune 520BT','Fone JBL Wave Buds','JBL Flip 6']},
    {label:'Xiaomi',icon:'🎧',prizes:['Fone Xiaomi Redmi Buds 5','Fone Xiaomi Redmi Buds 6 Play']},
    {label:'Stanley',icon:'🥤',prizes:['Garrafa Stanley Quick Flip','Garrafa Stanley IceFlow','Garrafa Stanley Classic']},
    {label:'Lattafa',icon:'✨',prizes:['Perfume Lattafa Asad','Perfume Lattafa Khamrah']},
    {label:'Afnan',icon:'✨',prizes:['Perfume Afnan 9PM','Perfume Afnan Supremacy Not Only Intense']},
    {label:'Armaf',icon:'✨',prizes:['Perfume Armaf Club de Nuit Intense Man','Perfume Armaf Club de Nuit Woman']},
    {label:'Smartwatches',icon:'⌚',prizes:['Apple Watch','Samsung Galaxy Watch','Xiaomi Redmi Watch','Amazfit Bip','Huawei Watch Fit','Garmin Venu']},
    {label:'Games e TV',icon:'🎮',prizes:['PlayStation 5','Smart TV 32"']}
  ];
  const all = groups.flatMap((g,i)=>g.prizes.map(name=>({name,segmentIndex:i})));
  const pick = all[Math.floor(Math.random()*all.length)];
  const slice = 360/groups.length;
  const polar=(angle,r)=>{const a=angle*Math.PI/180;return [180+Math.cos(a)*r,180+Math.sin(a)*r]};
  const wheel = `<div class="bn-wheel-stage"><div class="bn-wheel-pointer" aria-hidden="true"></div><svg class="bn-wheel" viewBox="0 0 360 360" role="img" aria-label="Roleta de prêmios">${groups.map((g,i)=>{const start=-90+i*slice,end=start+slice,[x1,y1]=polar(start,173),[x2,y2]=polar(end,173),mid=start+slice/2,[tx,ty]=polar(mid,111),[ix,iy]=polar(mid,143);return `<g class="bn-wheel-segment bn-wheel-color-${i%4}"><path d="M180 180 L${x1} ${y1} A173 173 0 0 1 ${x2} ${y2} Z"/><text class="bn-wheel-label" x="${tx}" y="${ty}" transform="rotate(${mid+90} ${tx} ${ty})">${g.label}</text><text class="bn-wheel-icon" x="${ix}" y="${iy}" transform="rotate(${mid+90} ${ix} ${iy})">${g.icon}</text></g>`}).join('')}</svg><div class="bn-wheel-hub"><b>BLACK</b><span>NOVEMBER</span></div></div>`;
  function start(){
    if (!document.body || document.querySelector('.bn-modal')) return;
    const fx=document.createElement('div'); fx.className='bn-fx';
    for(let i=0;i<22;i++){const dot=document.createElement('span');dot.style.left=Math.random()*100+'%';dot.style.animationDuration=(6+Math.random()*8)+'s';dot.style.animationDelay=(-Math.random()*10)+'s';fx.appendChild(dot)}
    document.body.appendChild(fx);
    const modal=document.createElement('div');
    modal.className='bn-modal';
    modal.innerHTML=`<div class="box"><button class="bn-x" aria-label="Fechar">×</button>
      <div data-s="1"><div class="bn-tag"><i></i>Chegou</div><div class="bn-hero"><img src="${asset}" alt="Caixa Deveu Perdeu Black November"><span class="bn-ribbon">BLACK NOVEMBER</span></div><h3>BLACK<span>NOVEMBER</span></h3><p>Caixas surpresa com até <b>70% OFF</b> e frete grátis. Ofertas por tempo limitado!</p><button class="bn-cta" data-go="2">Aproveitar Black November</button></div>
      <div data-s="2" hidden><div class="bn-tag"><i></i>Girou, ganhou</div><h4>Promoção <span>Black November</span>, Girou Ganhou!</h4><p>Eletrônicos, perfumes árabes, garrafas Stanley, fones JBL e Xiaomi e smartwatches de várias marcas. Consulte as condições da promoção e a disponibilidade dos prêmios.</p>${wheel}<button class="bn-cta" data-go="3">Girar a roleta</button></div>
      <div data-s="3" hidden><h4>Sorteando seu <span>prêmio</span>...</h4><div class="bn-wheel-slot"></div><div class="bn-win" hidden><p>🎉 Resultado:</p><strong></strong><p>Consulte as condições da promoção antes de finalizar a compra.</p><a class="bn-cta" href="#planos">Escolher minha caixa</a></div></div></div>`;
    const close=()=>{modal.remove();fx.remove();try{sessionStorage.setItem('_bn','1')}catch{}};
    const show=n=>modal.querySelectorAll('[data-s]').forEach(el=>el.hidden=el.dataset.s!==String(n));
    modal.addEventListener('click',ev=>{
      const target=ev.target;
      if(target===modal || target.closest('.bn-x')){close();return}
      if(target.closest('a')){close();return}
      const step=target.closest('[data-go]')?.dataset.go;
      if(step==='2') show(2);
      if(step==='3'){
        const stage=modal.querySelector('.bn-wheel-stage'), wheelEl=modal.querySelector('.bn-wheel');
        modal.querySelector('.bn-wheel-slot').appendChild(stage);show(3);
        requestAnimationFrame(()=>requestAnimationFrame(()=>{wheelEl.style.transform=`rotate(${2520-(pick.segmentIndex+.5)*(360/groups.length)}deg)`}));
        setTimeout(()=>{const win=modal.querySelector('.bn-win');win.querySelector('strong').textContent=pick.name;win.hidden=false;modal.querySelector('[data-s="3"] h4').innerHTML='Resultado do <span>sorteio</span>'},5200);
      }
    });
    document.body.appendChild(modal);
  }
  const css=document.createElement('link');css.rel='stylesheet';css.href='/assets/black-november-CvRxuK6-.css';document.head.appendChild(css);
  const launch=()=>{let seen=false;try{seen=sessionStorage.getItem('_bn')==='1'}catch{}if(!seen)start()};
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>setTimeout(launch,1200),{once:true});else setTimeout(launch,1200);
})();