// Terminal typing signature in the hero
(function(){
  var body = document.getElementById('termBody');
  if(!body) return;
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var lines = [
    {prompt:'$ whoami', out:'Isaiah Green — B.S. Software Engineering (in progress), St. Cloud State University'},
    {prompt:'$ status', out:'available for new projects and support requests'},
    {prompt:'$ services --list', out:'build: web apps, scripts<br>fix: setup, repair, network, backup'}
  ];

  if(reduced){
    body.innerHTML = lines.map(function(l){
      return '<div class="line"><span class="prompt">'+l.prompt+'</span><span class="out">'+l.out+'</span></div>';
    }).join('');
    return;
  }

  body.innerHTML = '';
  var lineIndex = 0, charIndex = 0;

  function typeNext(){
    if(lineIndex >= lines.length) return;
    var current = lines[lineIndex];
    var div = document.getElementById('line-'+lineIndex);
    if(!div){
      div = document.createElement('div');
      div.className = 'line';
      div.id = 'line-'+lineIndex;
      div.innerHTML = '<span class="prompt"></span><span class="caret"></span>';
      body.appendChild(div);
    }
    var promptSpan = div.querySelector('.prompt');
    if(charIndex <= current.prompt.length){
      promptSpan.textContent = current.prompt.slice(0, charIndex);
      charIndex++;
      setTimeout(typeNext, 32);
    } else {
      var caret = div.querySelector('.caret');
      if(caret) caret.remove();
      var out = document.createElement('span');
      out.className = 'out';
      out.innerHTML = current.out;
      div.appendChild(out);
      lineIndex++;
      charIndex = 0;
      setTimeout(typeNext, 380);
    }
  }
  setTimeout(typeNext, 400);
})();

function handleSubmit(e){
  e.preventDefault();
  var name = document.getElementById('name').value || 'there';
  var form = e.target;
  form.innerHTML = '<p style="font-family:\'Fraunces\',serif;font-size:1.15rem;margin:0;">Thanks, ' + name.split(' ')[0] + ' — message received. Expect a reply soon.</p>';
  return false;
}
