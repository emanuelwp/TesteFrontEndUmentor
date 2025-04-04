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

// Dados mockados
const feedbacksData = [
  {
    id: 1,
    data: "04/04/2025",
    dataHora: "04/04/2025 às 14:32",
    destinatario: "Pedro",
    area: "Atendimento",
    tipo: "elogio",
    avaliacao: 5,
    status: "respondido",
    mensagem: "Gostaria de elogiar o atendimento do Pedro. Ele foi extremamente atencioso e resolveu meu problema rapidamente. Sua paciência e conhecimento técnico foram fundamentais para solucionar minha dúvida. Recomendo fortemente seus serviços!",
    anexos: [
      { nome: "evidencia-atendimento.pdf", tipo: "pdf" },
      { nome: "screenshot-conversa.jpg", tipo: "image" }
    ],
    resposta: {
      conteudo: "Olá! Agradeço muito pelo seu feedback positivo sobre meu atendimento. Fico extremamente feliz em saber que pude ajudar e que a experiência foi satisfatória. Estarei sempre à disposição para auxiliar no que for necessário. Muito obrigado!",
      data: "05/04/2025 às 09:15",
      autor: "Pedro"
    }
  },
  {
    id: 2,
    data: "02/04/2025",
    dataHora: "02/04/2025 às 10:15",
    destinatario: "Cláudia",
    area: "Produto",
    tipo: "sugestao",
    avaliacao: 3,
    status: "pendente",
    mensagem: "Gostaria de sugerir melhorias na interface do aplicativo. Seria interessante ter mais opções de personalização e uma navegação mais intuitiva.",
    anexos: [],
    resposta: null
  },
  {
    id: 3,
    data: "01/04/2025",
    dataHora: "01/04/2025 às 08:45",
    destinatario: "João",
    area: "Entrega",
    tipo: "critica",
    avaliacao: 2,
    status: "enviado",
    mensagem: "O prazo de entrega não foi cumprido conforme combinado. Isso prejudicou meu planejamento e gerou transtornos.",
    anexos: [
      { nome: "comprovante-atraso.pdf", tipo: "pdf" }
    ],
    resposta: null
  },
  {
    id: 4,
    data: "28/03/2025",
    dataHora: "28/03/2025 às 16:22",
    destinatario: "Maria",
    area: "Marketing",
    tipo: "elogio",
    avaliacao: 4,
    status: "respondido",
    mensagem: "A campanha publicitária foi excelente! O material promocional estava muito bem elaborado e atraente.",
    anexos: [],
    resposta: {
      conteudo: "Obrigada pelo seu feedback positivo! Estamos sempre buscando melhorar nossas campanhas de marketing e seu retorno é muito importante para nós.",
      data: "29/03/2025 às 11:30",
      autor: "Maria"
    }
  },
  {
    id: 5,
    data: "25/03/2025",
    dataHora: "25/03/2025 às 13:05",
    destinatario: "Arthur",
    area: "Vendas",
    tipo: "sugestao",
    avaliacao: 4,
    status: "enviado",
    mensagem: "Sugiro que o processo de vendas seja mais simplificado. Há muitas etapas que poderiam ser otimizadas.",
    anexos: [
      { nome: "sugestoes-detalhadas.docx", tipo: "doc" }
    ],
    resposta: null
  }
];

let currentPage = 1;
const itemsPerPage = 5;
let filteredData = [...feedbacksData];


document.addEventListener('DOMContentLoaded', function () {
  initializeDateFields();

  if (window.innerWidth <= 768) {
    const sidebar = document.getElementById('sidebar');
    if (sidebar) {
      sidebar.style.transform = 'translateX(-100%)';
    }
  }

  renderFeedbacks(filteredData);
  updatePagination();
  updateResultsCount();

  setupEventListeners();
});

//Datas iniciais
function initializeDateFields() {
  const today = new Date();
  const firstDay = new Date(today.getFullYear(), 0, 1);
  const lastDay = new Date(today.getFullYear(), 11 + 1, 0);

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const dataInicio = document.getElementById('data-inicio');
  const dataFim = document.getElementById('data-fim');

  if (dataInicio) dataInicio.value = formatDate(firstDay);
  if (dataFim) dataFim.value = formatDate(lastDay);
}

// EventListeners
function setupEventListeners() {
  const toggleBtn = document.getElementById('toggle-sidebar');
  if (toggleBtn) {
    toggleBtn.addEventListener('click', toggleSidebar);
  }


  const filtersForm = document.querySelector('.filters-form');
  if (filtersForm) {
    filtersForm.addEventListener('submit', function (e) {
      e.preventDefault();
      applyFilters();
    });
  }


  const closeModalBtn = document.querySelector('.close-modal');
  const closeBtnInModal = document.querySelector('.close-btn');

  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closeModal);
  }

  if (closeBtnInModal) {
    closeBtnInModal.addEventListener('click', closeModal);
  }
  const modal = document.getElementById('feedbackDetailsModal');
  if (modal) {
    window.addEventListener('click', function (e) {
      if (e.target === modal) {
        closeModal();
      }
    });
  }
}

// Filtros
function applyFilters() {
  const dataInicio = document.getElementById('data-inicio').value;
  const dataFim = document.getElementById('data-fim').value;
  const tipoFeedback = document.getElementById('tipo-feedback').value;
  const statusFeedback = document.getElementById('status-feedback').value;

  const dataInicioObj = dataInicio ? new Date(dataInicio) : null;
  const dataFimObj = dataFim ? new Date(dataFim) : null;

  filteredData = feedbacksData.filter(feedback => {
    const parts = feedback.data.split('/');
    const feedbackDate = new Date(parts[2], parts[1] - 1, parts[0]);

    const passesDateFilter =
      (!dataInicioObj || feedbackDate >= dataInicioObj) &&
      (!dataFimObj || feedbackDate <= dataFimObj);

    const passesTypeFilter = !tipoFeedback || feedback.tipo === tipoFeedback;

    const passesStatusFilter = !statusFeedback || feedback.status === statusFeedback;

    return passesDateFilter && passesTypeFilter && passesStatusFilter;
  });

  currentPage = 1;
  renderFeedbacks(filteredData);
  updatePagination();
  updateResultsCount();
}

// Renderizar feedbacks
function renderFeedbacks(data) {
  const tableBody = document.querySelector('.feedbacks-table tbody');
  if (!tableBody) return;

  tableBody.innerHTML = '';

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, data.length);
  const pageData = data.slice(startIndex, endIndex);

  if (pageData.length === 0) {
    const row = document.createElement('tr');
    row.innerHTML = `<td colspan="7" class="text-center">Nenhum feedback encontrado.</td>`;
    tableBody.appendChild(row);
    return;
  }

  pageData.forEach(feedback => {
    const row = document.createElement('tr');

    let starsHTML = '';
    for (let i = 1; i <= 5; i++) {
      if (i <= feedback.avaliacao) {
        starsHTML += '<i class="fa-solid fa-star"></i>';
      } else {
        starsHTML += '<i class="fa-regular fa-star"></i>';
      }
    }

    row.innerHTML = `
      <td>${feedback.data}</td>
      <td>${feedback.destinatario}</td>
      <td>${feedback.area}</td>
      <td><span class="badge ${feedback.tipo}">${capitalizeFirstLetter(feedback.tipo)}</span></td>
      <td>
        <div class="stars-display">
          ${starsHTML}
        </div>
      </td>
      <td><span class="status-badge ${feedback.status}">${capitalizeFirstLetter(feedback.status)}</span></td>
      <td>
        <button class="action-btn view-btn" data-id="${feedback.id}" title="Visualizar"><i class="fa-solid fa-eye"></i></button>
      </td>
    `;

    tableBody.appendChild(row);
  });

  addViewButtonListeners();
}

// eventListener para o ViewButton
function addViewButtonListeners() {
  document.querySelectorAll('.view-btn').forEach(btn => {
    btn.addEventListener('click', function () {
      const feedbackId = parseInt(this.getAttribute('data-id'));
      openFeedbackModal(feedbackId);
    });
  });
}
function updateResultsCount() {
  const resultsCount = document.querySelector('.results-count');
  if (resultsCount) {
    resultsCount.textContent = `${filteredData.length} resultados encontrados`;
  }
}

// Paginação
function updatePagination() {
  const paginationContainer = document.querySelector('.pagination');
  if (!paginationContainer) return;

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  paginationContainer.innerHTML = '';

  const prevBtn = document.createElement('button');
  prevBtn.className = 'pagination-btn';
  prevBtn.innerHTML = '<i class="fa-solid fa-chevron-left"></i>';
  prevBtn.disabled = currentPage === 1;
  if (!prevBtn.disabled) {
    prevBtn.addEventListener('click', () => {
      if (currentPage > 1) {
        currentPage--;
        renderFeedbacks(filteredData);
        updatePagination();
      }
    });
  }
  paginationContainer.appendChild(prevBtn);

  const maxVisiblePages = 3;
  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    const pageBtn = document.createElement('button');
    pageBtn.className = 'pagination-btn';
    if (i === currentPage) {
      pageBtn.classList.add('active');
    }
    pageBtn.textContent = i;
    pageBtn.addEventListener('click', () => {
      currentPage = i;
      renderFeedbacks(filteredData);
      updatePagination();
    });
    paginationContainer.appendChild(pageBtn);
  }

  const nextBtn = document.createElement('button');
  nextBtn.className = 'pagination-btn';
  nextBtn.innerHTML = '<i class="fa-solid fa-chevron-right"></i>';
  nextBtn.disabled = currentPage === totalPages || totalPages === 0;
  if (!nextBtn.disabled) {
    nextBtn.addEventListener('click', () => {
      if (currentPage < totalPages) {
        currentPage++;
        renderFeedbacks(filteredData);
        updatePagination();
      }
    });
  }
  paginationContainer.appendChild(nextBtn);
}

// Abrir Card com mais informações
function openFeedbackModal(feedbackId) {
  const feedback = feedbacksData.find(f => f.id === feedbackId);
  if (!feedback) return;

  const modal = document.getElementById('feedbackDetailsModal');
  if (!modal) return;

  const infoGroups = modal.querySelectorAll('.info-group');

  infoGroups[0].querySelector('.info-value').textContent = feedback.dataHora;

  infoGroups[1].querySelector('.info-value').textContent = feedback.destinatario;

  infoGroups[2].querySelector('.info-value').textContent = feedback.area;

  const tipoBadge = document.createElement('span');
  tipoBadge.className = `badge ${feedback.tipo}`;
  tipoBadge.textContent = capitalizeFirstLetter(feedback.tipo);
  const tipoValue = infoGroups[3].querySelector('.info-value');
  tipoValue.innerHTML = '';
  tipoValue.appendChild(tipoBadge);

  const starsDisplay = infoGroups[4].querySelector('.stars-display');
  if (starsDisplay) {
    starsDisplay.innerHTML = '';
    for (let i = 1; i <= 5; i++) {
      const star = document.createElement('i');
      star.className = i <= feedback.avaliacao ? 'fa-solid fa-star' : 'fa-regular fa-star';
      starsDisplay.appendChild(star);
    }
  }

  const statusBadge = document.createElement('span');
  statusBadge.className = `status-badge ${feedback.status}`;
  statusBadge.textContent = capitalizeFirstLetter(feedback.status);
  const statusValue = infoGroups[5].querySelector('.info-value');
  statusValue.innerHTML = '';
  statusValue.appendChild(statusBadge);

  const messageContent = modal.querySelector('.message-content');
  if (messageContent) {
    messageContent.innerHTML = `<p>${feedback.mensagem}</p>`;
  }

  const attachmentsContainer = modal.querySelector('.attachments-container');
  const attachmentsList = modal.querySelector('.attachments-list');

  if (attachmentsContainer && attachmentsList) {
    if (feedback.anexos && feedback.anexos.length > 0) {
      attachmentsContainer.style.display = 'block';
      attachmentsList.innerHTML = '';

      feedback.anexos.forEach(anexo => {
        const iconClass = getFileIconClass(anexo.tipo);
        const anexoElement = document.createElement('div');
        anexoElement.className = 'attachment-item';
        anexoElement.innerHTML = `
          <i class="${iconClass}"></i>
          <span>${anexo.nome}</span>
          <button class="download-btn"><i class="fa-solid fa-download"></i></button>
        `;
        attachmentsList.appendChild(anexoElement);
      });
    } else {
      attachmentsContainer.style.display = 'none';
    }
  }

  const responseContainer = modal.querySelector('.response-container');
  const responseContent = modal.querySelector('.response-content');

  if (responseContainer && responseContent) {
    if (feedback.resposta) {
      responseContainer.style.display = 'block';
      responseContent.innerHTML = `
        <p>${feedback.resposta.conteudo}</p>
        <div class="response-footer">
          <div class="response-date">Respondido em: ${feedback.resposta.data}</div>
          <div class="responder">${feedback.resposta.autor}</div>
        </div>
      `;
    } else {
      responseContainer.style.display = 'none';
    }
  }

  modal.classList.add('active');
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function getFileIconClass(fileType) {
  const iconMap = {
    'pdf': 'fa-solid fa-file-pdf',
    'image': 'fa-solid fa-file-image',
    'doc': 'fa-solid fa-file-word',
    'xls': 'fa-solid fa-file-excel',
  };

  return iconMap[fileType] || 'fa-solid fa-file';
}

// Fecha o card
function closeModal() {
  const modal = document.getElementById('feedbackDetailsModal');
  if (modal) {
    modal.classList.remove('active');
  }
}

// Icone por tipo
function getFileIconClass(fileType) {
  switch (fileType.toLowerCase()) {
    case 'pdf':
      return 'fa-solid fa-file-pdf';
    case 'doc':
    case 'docx':
      return 'fa-solid fa-file-word';
    case 'xls':
    case 'xlsx':
      return 'fa-solid fa-file-excel';
    case 'ppt':
    case 'pptx':
      return 'fa-solid fa-file-powerpoint';
    case 'image':
    case 'jpg':
    case 'jpeg':
    case 'png':
    case 'gif':
      return 'fa-solid fa-file-image';
    default:
      return 'fa-solid fa-file';
  }
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}