//Sidebar
function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  const content = document.querySelector('.content');

  sidebar.classList.toggle('collapsed');

  if (window.innerWidth <= 768) {
    if (sidebar.style.transform === 'translateX(0px)') {
      sidebar.style.transform = 'translateX(-100%)';
    } else {
      sidebar.style.transform = 'translateX(0px)';
    }
  }
}

window.addEventListener('resize', function () {
  const sidebar = document.getElementById('sidebar');

  if (window.innerWidth > 768) {
    sidebar.style.transform = '';
  } else if (!sidebar.classList.contains('collapsed')) {
    sidebar.style.transform = 'translateX(-100%)';
  }
});

//Avaliação por estrelas
function initStarRating() {
  const starLabels = document.querySelectorAll('.star-rating label');
  const ratingText = document.querySelector('.rating-text');
  const ratingLabels = ['Péssimo', 'Ruim', 'Neutro', 'Bom', 'Ótimo'];

  starLabels.forEach((label, index) => {
    label.addEventListener('click', () => {
      const rating = 5 - index;
      ratingText.textContent = ratingLabels[rating - 1];
    });

    label.addEventListener('mouseenter', () => {
      const rating = 5 - index;
      ratingText.textContent = ratingLabels[rating - 1];
    });
  });

  document.querySelector('.star-rating').addEventListener('mouseleave', () => {
    const checkedInput = document.querySelector('.star-rating input:checked');
    if (checkedInput) {
      const rating = parseInt(checkedInput.value);
      ratingText.textContent = ratingLabels[rating - 1];
    } else {
      ratingText.textContent = 'Avalie a sua satisfação entre 1 e 5 estrelas';
    }
  });
}

//Upload de arquvios
function initFileUpload() {
  const dropzone = document.querySelector('.attachment-dropzone');
  const fileInput = document.getElementById('file-upload');
  const attachedFiles = document.querySelector('.attached-files');
  const uploadLink = document.querySelector('.upload-link');

  if (uploadLink) {
    uploadLink.addEventListener('click', (e) => {
      e.preventDefault();
      fileInput.click();
    });
  }

  dropzone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropzone.classList.add('dragover');
  });

  dropzone.addEventListener('dragleave', () => {
    dropzone.classList.remove('dragover');
  });

  dropzone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropzone.classList.remove('dragover');
    handleFiles(e.dataTransfer.files);
  });

  dropzone.addEventListener('click', () => {
    fileInput.click();
  });

  fileInput.addEventListener('change', () => {
    handleFiles(fileInput.files);
  });
}

//Logica para anexar
function handleFiles(files) {
  const attachedFiles = document.querySelector('.attached-files');
  for (const file of files) {
    addFileToList(file);
  }
}

//Adiciona arquivo anexado
function addFileToList(file) {
  const attachedFiles = document.querySelector('.attached-files');
  const fileElement = document.createElement('div');
  fileElement.className = 'attached-file';

  let fileIcon = 'fa-file';
  if (file.type.includes('image')) fileIcon = 'fa-file-image';
  else if (file.type.includes('pdf')) fileIcon = 'fa-file-pdf';
  else if (file.type.includes('word') || file.name.endsWith('.doc') || file.name.endsWith('.docx'))
    fileIcon = 'fa-file-word';
  else if (file.type.includes('excel') || file.name.endsWith('.xls') || file.name.endsWith('.xlsx'))
    fileIcon = 'fa-file-excel';

  const fileSize = file.size < 1024 * 1024
    ? `${Math.round(file.size / 1024)}KB`
    : `${Math.round(file.size / (1024 * 1024) * 10) / 10}MB`;

  fileElement.innerHTML = `
    <div class="file-icon"><i class="fa-solid ${fileIcon}"></i></div>
    <div class="file-info">
      <div class="file-name">${file.name}</div>
      <div class="file-size">${fileSize}</div>
    </div>
    <button class="remove-file" type="button"><i class="fa-solid fa-xmark"></i></button>
  `;

  attachedFiles.appendChild(fileElement);

  fileElement.querySelector('.remove-file').addEventListener('click', () => {
    fileElement.remove();
  });
}

// Valida o formulario
function initFormValidation() {
  const form = document.querySelector('.feedback-form');

  createErrorAndSuccessElements();

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    clearErrors();

    let isValid = validateForm();

    if (!isValid) {
      return;
    }
    showSuccessPopup();

    setTimeout(resetForm, 3000);
  });

  const cancelButton = document.querySelector('.btn-secondary');
  if (cancelButton) {
    cancelButton.addEventListener('click', (e) => {
      e.preventDefault();
      if (confirm('Tem certeza que deseja cancelar? Todas as informações serão perdidas.')) {
        resetForm();
      }
    });
  }
}

//Valida os campos
function validateForm() {
  const destinatario = document.getElementById('destinatario');
  const area = document.getElementById('area');
  const mensagem = document.getElementById('mensagem');

  let isValid = true;

  if (!destinatario || !destinatario.value.trim()) {
    if (destinatario) showError(destinatario, 'Por favor, informe o destinatário.');
    isValid = false;
  }

  if (!area || !area.value) {
    if (area) showError(area, 'Por favor, selecione uma área.');
    isValid = false;
  }

  const tipoFeedback = document.querySelector('input[name="tipo"]:checked');
  if (!tipoFeedback) {
    const tipoContainer = document.querySelector('.feedback-types');
    if (tipoContainer) showError(tipoContainer, 'Por favor, selecione um tipo de feedback.');
    isValid = false;
  }

  const rating = document.querySelector('input[name="rating"]:checked');
  if (!rating) {
    const ratingContainer = document.querySelector('.star-rating');
    if (ratingContainer) showError(ratingContainer, 'Por favor, dê uma avaliação.');
    isValid = false;
  }

  if (!mensagem || !mensagem.value.trim()) {
    if (mensagem) showError(mensagem, 'Por favor, escreva uma mensagem.');
    isValid = false;
  }

  return isValid;
}

//MOstra um erro
function showError(element, message) {
  if (!element) return;

  const errorElement = document.createElement('div');
  errorElement.className = 'validation-error';
  errorElement.textContent = message;
  errorElement.style.color = '#dc3545';
  errorElement.style.fontSize = '12px';
  errorElement.style.marginTop = '4px';

  element.style.borderColor = '#dc3545';

  if (element.parentNode) {
    element.parentNode.appendChild(errorElement);
  }
}

//Tira as mensagens de erro
function clearErrors() {
  document.querySelectorAll('.validation-error').forEach(el => el.remove());

  document.querySelectorAll('input, select, textarea').forEach(el => {
    el.style.borderColor = '';
  });

  document.querySelectorAll('.radio-options, .star-rating').forEach(el => {
    el.style.borderColor = '';
  });
}

//Popup de sucesso
function showSuccessPopup() {
  const popup = document.getElementById('success-popup');
  if (popup) {
    popup.style.display = 'flex';

    const closeButton = document.getElementById('close-popup');
    if (closeButton) {
      const newCloseButton = closeButton.cloneNode(true);
      closeButton.parentNode.replaceChild(newCloseButton, closeButton);

      newCloseButton.addEventListener('click', function () {
        popup.style.display = 'none';
      });
    }
  }
}

//Resetar formulário
function resetForm() {
  const form = document.querySelector('.feedback-form');
  const attachedFiles = document.querySelector('.attached-files');
  const ratingText = document.querySelector('.rating-text');

  if (form) form.reset();
  if (attachedFiles) attachedFiles.innerHTML = '';
  if (ratingText) ratingText.textContent = 'Avalie a sua satisfação entre 1 e 5 estrelas';

  clearErrors();

  const popup = document.getElementById('success-popup');
  if (popup) {
    popup.style.display = 'none';
  }
}

//Erro e sucesso
function createErrorAndSuccessElements() {
  if (!document.getElementById('success-popup')) {
    const successPopup = document.createElement('div');
    successPopup.id = 'success-popup';
    successPopup.innerHTML = `
      <div class="popup-content">
        <div class="popup-header">
          <h3>Feedback Enviado</h3>
          <button id="close-popup">&times;</button>
        </div>
        <div class="popup-body">
          <div class="success-icon">
            <i class="fa-solid fa-check-circle"></i>
          </div>
          <p>Seu feedback foi enviado com sucesso!</p>
          <p>Agradecemos o seu contato.</p>
        </div>
      </div>
    `;
    document.body.appendChild(successPopup);
  }
}

//Estilos css
function addStyles() {
  if (!document.getElementById('feedback-system-styles')) {
    const style = document.createElement('style');
    style.id = 'feedback-system-styles';
    style.textContent = `
      /* Estilos para o popup de sucesso */
      #success-popup {
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        justify-content: center;
        align-items: center;
        z-index: 1000;
      }
      
      .popup-content {
        background-color: white;
        border-radius: 8px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
        width: 90%;
        max-width: 400px;
        overflow: hidden;
      }
      
      .popup-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 15px;
        background-color: #6a0dad;
        color: white;
      }
      
      .popup-header h3 {
        margin: 0;
        font-size: 18px;
      }
      
      #close-popup {
        background: none;
        border: none;
        color: white;
        font-size: 24px;
        cursor: pointer;
      }
      
      .popup-body {
        padding: 20px;
        text-align: center;
      }
      
      .success-icon {
        font-size: 48px;
        color: #28a745;
        margin-bottom: 15px;
      }
      
      .popup-body p {
        margin: 10px 0;
        color: #333;
      }
      
      .radio-options, .star-rating {
        transition: border-color 0.3s;
      }
      
      input:focus, select:focus, textarea:focus {
        outline: none;
        border-color: #6a0dad;
      }
      
      /* Estilos para o dropzone */
      .attachment-dropzone.dragover {
        background-color: rgba(106, 13, 173, 0.05);
        border-color: #6a0dad;
      }
      
      .attached-file {
        display: flex;
        align-items: center;
        padding: 8px;
        margin-top: 8px;
        background-color: #f9f9f9;
        border-radius: 4px;
      }
      
      .file-icon {
        margin-right: 10px;
        color: #6a0dad;
      }
      
      .file-info {
        flex: 1;
      }
      
      .file-name {
        font-size: 12px;
        font-weight: bold;
      }
      
      .file-size {
        font-size: 10px;
        color: #666;
      }
      
      .remove-file {
        background: none;
        border: none;
        color: #999;
        cursor: pointer;
        padding: 5px;
      }
      
      .remove-file:hover {
        color: #F44336;
      }
    `;
    document.head.appendChild(style);
  }
}

//Event Listeners
document.addEventListener('DOMContentLoaded', function () {
  initSidebar();
  initStarRating();
  initFileUpload();
  initFormValidation();
  addStyles();
});