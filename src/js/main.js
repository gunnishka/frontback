document.addEventListener('DOMContentLoaded', function() {
    //валидация
    const dlg = document.getElementById('contactDialog');
    const openBtn = document.getElementById('openDialog');
    const closeBtn = document.getElementById('closeDialog');
    const form = document.getElementById('contactForm');
    let lastActive = null;

    openBtn.addEventListener('click', () => {
        lastActive = document.activeElement;
        dlg.showModal();
        dlg.querySelector('input,select,textarea,button')?.focus();
    })

    closeBtn.addEventListener('click', () => dlg.close('cancel'));

    form?.addEventListener('submit', (e) => {
        [...form.elements].forEach(el => el.setCustomValidity?.(''));

        if(!form.checkValidity()){
            e.preventDefault();
        }
        
        const email = form.elements.email;
        if (email?.validity.typeMismatch){
            email.setCustomValidity('Введите корректный e-mail');
        }

        form.reportValidity();

        [...form.elements].forEach (el => {
            if (el.willValidate) el.toggleAttribute('aria-invalid', !el.checkValidity());
        });
        return;

        e.preventDefault();
        document.getElementById('contactDialog')?.close('success');
        form.reset();
    })

    dlg.addEventListener('close', () => lastActive?.focus());

    //кнопка смены темы
    const KEY='theme', btn=document.querySelector('.theme-toggle'); 
    const prefersDark = matchMedia('(prefers-color-scheme: dark)').matches; 

    if(localStorage.getItem(KEY)==='dark' || (!localStorage.getItem(KEY) && 
    prefersDark)){ 
        document.body.classList.add('theme-dark'); 
        btn?.setAttribute('aria-pressed','true'); 
    } 

    btn?.addEventListener('click', ()=>{ 
        const isDark=document.body.classList.toggle('theme-dark'); 
        btn.setAttribute('aria-pressed', String(isDark)); 
        localStorage.setItem(KEY, isDark ? 'dark' : 'light'); 
    });
})