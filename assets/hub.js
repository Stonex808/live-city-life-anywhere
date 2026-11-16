/* Live City Life, Anywhere — small helper widgets. Pages work without this file. */
(function(){
  document.documentElement.classList.add('js');
  var fmt=function(n,d){return isFinite(n)?n.toLocaleString('en-US',{minimumFractionDigits:d||0,maximumFractionDigits:d||0}):'—'};
  var num=function(f,n){var el=f.querySelector('[name="'+n+'"]');return el?parseFloat(el.value):NaN};
  var out=function(f,html,cls){var r=f.querySelector('.result');r.className='result'+(cls?' '+cls:'');r.innerHTML=html};
  var calcs={
    nameplate:function(f){
      var v=num(f,'v'),a=num(f,'a'),lra=num(f,'lra');
      if(!(v>0&&a>0))return out(f,'Enter volts and running amps from the nameplate.');
      var w=v*a,h='Running ≈ <b>'+fmt(w)+' W</b> ('+fmt(v)+' V × '+fmt(a,1)+' A). '+
        'Starting estimate for a motor: <b>'+fmt(w*2)+'–'+fmt(w*3)+' W</b> <span class="est">2–3× rule of thumb</span>.';
      if(lra>0)h+=' With LRA on the plate, a conservative upper bound is <b>'+fmt(v*lra)+' W</b> ('+fmt(v)+' V × '+fmt(lra,1)+' LRA).';
      if(v>=200)h+=' <br>This is a 240 V load: you need a generator with a 240 V outlet and a transfer switch or interlock installed by an electrician.';
      out(f,h);
    },
    runtime:function(f){
      var wh=num(f,'wh'),w=num(f,'w'),eff=num(f,'eff'),cont=num(f,'cont');
      if(!(wh>0&&w>0))return out(f,'Enter battery capacity (Wh) and the average load (W).');
      if(!(eff>0))eff=85;
      var hrs=wh*eff/100/w,h='About <b>'+fmt(hrs,1)+' hours</b> at '+fmt(w)+' W average ('+fmt(wh)+' Wh × '+fmt(eff)+'% ÷ '+fmt(w)+' W). <span class="est">estimate</span>';
      var cls='';
      if(cont>0&&w>cont){h+='<br>That load is above the '+fmt(cont)+' W continuous rating. The station will shut off.';cls='bad'}
      else if(cont>0&&w>cont*0.8){h+='<br>You are above 80% of the continuous rating. Expect fan noise and less headroom for motor starts.';cls='warn'}
      out(f,h,cls);
    },
    drawdown:function(f){
      var g=num(f,'gpm'),m=num(f,'min'),ci=num(f,'cutin');
      if(!(g>0))return out(f,'Enter your pump flow in GPM.');
      if(!(m>0))m=1;
      var h='Your tank needs at least <b>'+fmt(g*m,1)+' gal of drawdown</b> ('+fmt(g,1)+' GPM × '+fmt(m,1)+' min). That is drawdown, not tank size: a tank holds several times its drawdown.';
      if(ci>0)h+='<br>Empty-tank precharge: <b>'+fmt(ci-2)+' psi</b> (cut-in '+fmt(ci)+' − 2).';
      out(f,h);
    },
    passes:function(f){
      var w=num(f,'w'),l=num(f,'l'),c=num(f,'c');
      if(!(w>0&&c>0))return out(f,'Enter the driveway width in feet.');
      var cut=c/12*0.85,p=Math.ceil(w/cut-1e-9),h='About <b>'+fmt(p)+' passes</b> ('+fmt(w)+' ft ÷ '+fmt(cut,2)+' ft cut with ~15% overlap). <span class="est">estimate</span>';
      if(l>0){var d=p*l,m=d/176+Math.max(p-1,0)*10/60;h+='<br>About <b>'+fmt(d)+' ft</b> of walking, roughly <b>'+fmt(Math.max(m,1))+' min</b> at ~2 mph plus turns. Deep or wet snow is slower.'}
      h+='<br>Class, width and a width-by-width comparison: <a href="snowblower-size-picker.html">Snowblower Size Picker</a>.';
      out(f,h);
    },
    circuit:function(f){
      var w=num(f,'w'),a=num(f,'amps'),v=num(f,'v')||120;
      if(!(w>0))return out(f,'Enter the total watts of everything on the same breaker.');
      var amps=w/v,lim=a*0.8,cls,h='<b>'+fmt(amps,1)+' A</b> on a '+fmt(a)+' A breaker ('+fmt(w)+' W ÷ '+fmt(v)+' V). 80% guideline: '+fmt(lim,0)+' A / '+fmt(lim*v)+' W. ';
      if(amps>a){cls='bad';h+='This will trip. Move a load to another circuit or use a lower heater setting.'}
      else if(amps>lim){cls='warn';h+='Over the 80% continuous-load guideline. Fine for a few minutes, not for a heater running all evening.'}
      else{cls='ok';h+='Under the guideline, with about '+fmt(lim*v-w)+' W to spare.'}
      out(f,h,cls);
    }
  };
  document.querySelectorAll('form.calc[data-calc]').forEach(function(f){
    var fn=calcs[f.getAttribute('data-calc')];if(!fn)return;
    if(!f.querySelector('.result')){var r=document.createElement('div');r.className='result';r.setAttribute('aria-live','polite');f.appendChild(r)}
    f.addEventListener('submit',function(e){e.preventDefault();fn(f)});
    f.addEventListener('input',function(){fn(f)});
    f.addEventListener('change',function(){fn(f)});
    fn(f);
  });
  /* checklists: remember ticks on this device only */
  document.querySelectorAll('.checklist[data-key]').forEach(function(ul){
    var key='lcla:'+ul.getAttribute('data-key'),saved={};
    try{saved=JSON.parse(localStorage.getItem(key)||'{}')}catch(e){}
    ul.querySelectorAll('input[type=checkbox]').forEach(function(cb,i){
      if(saved[i])cb.checked=true;
      cb.addEventListener('change',function(){saved[i]=cb.checked;try{localStorage.setItem(key,JSON.stringify(saved))}catch(e){}});
    });
  });
  document.querySelectorAll('[data-print]').forEach(function(b){b.hidden=false;b.addEventListener('click',function(){window.print()})});
  document.querySelectorAll('[data-reset]').forEach(function(b){b.hidden=false;b.addEventListener('click',function(){
    document.querySelectorAll('.checklist[data-key]').forEach(function(ul){ul.querySelectorAll('input').forEach(function(c){c.checked=false});try{localStorage.removeItem('lcla:'+ul.getAttribute('data-key'))}catch(e){}});
  })});
})();
