// p3dR1n@n8

function setLoandig(isLoading) {
    const btnSpan = document.getElementById('generate-btn');

    if (isLoading) {
        btnSpan.innerHTML = 'Gerando Background...';
    } else { btnSpan.innerHTML = "Gerar Background Mágico"; }
}

function disableBodyBackground() {
  document.body.style.setProperty('background-image', 'none', 'important');
  document.body.style.setProperty('background', '#0f131a', 'important');
}

function enableBodyBackground() {
  document.body.style.removeProperty('background-image');
  document.body.style.removeProperty('background');
}

document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.form-group');
    const textArea = document.getElementById('description');
    const htmlCode = document.getElementById('html-code');
    const cssCode = document.getElementById('css-code');
    const preview = document.getElementById('preview-section');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const description = textArea.value.trim();
        if (!description) { return; };
        setLoandig(true);

        try {
            const response = await fetch('https://cardosoautomate.app.n8n.cloud/webhook/gerador-fundos-zarkiod', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ description })
            });

            const data = await response.json();

            htmlCode.textContent = data.code || "";
            cssCode.textContent = data.style || "";
            preview.style.display = "block";
            preview.innerHTML = data.code || "";

            let styleTag = document.getElementById("dynamic-style");

            if (styleTag) {
                styleTag.remove();
            }
            if (data.style) {
                styleTag = document.createElement('style');
                styleTag.id = 'dynamic-style';

                styleTag.textContent = data.style;
                document.head.appendChild(styleTag);
            }
            disableBodyBackground();
        } catch (error) { 
            console.error("Erro ao gerar o fundo:", error);
            htmlCode.textContent = "Não consegui gerar o código HTML, tente novamente.";
            cssCode.textContent = "Não consegui gerar o código CSS, tente novamente.";
            preview.innerHTML = "";
            enableBodyBackground();
        } finally {
            setLoandig(false);
        }
    })
});