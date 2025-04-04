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

document.addEventListener('DOMContentLoaded', function () {
  if (window.innerWidth <= 768) {
    const sidebar = document.getElementById('sidebar');
    sidebar.style.transform = 'translateX(-100%)';
  }
});

//Gráfico de tipo
document.addEventListener("DOMContentLoaded", function () {
  const metrics = [
    {
      title: "Áreas com mais Elogios",
      data: [
        { area: "Vendas", percent: 80 },
        { area: "Marketing", percent: 75 },
        { area: "Suporte", percent: 70 },
        { area: "Produto", percent: 65 },
        { area: "Atendimento", percent: 60 },
        { area: "Entrega", percent: 55 }
      ]
    },
    {
      title: "Áreas com mais Sugestões",
      data: [
        { area: "Produto", percent: 78 },
        { area: "Marketing", percent: 72 },
        { area: "Suporte", percent: 65 },
        { area: "Vendas", percent: 60 },
        { area: "Atendimento", percent: 58 },
        { area: "Entrega", percent: 50 }
      ]
    },
    {
      title: "Áreas com mais Críticas",
      data: [
        { area: "Entrega", percent: 85 },
        { area: "Atendimento", percent: 75 },
        { area: "Suporte", percent: 68 },
        { area: "Produto", percent: 62 },
        { area: "Marketing", percent: 59 },
        { area: "Vendas", percent: 50 }
      ]
    }
  ];

  let currentIndex = 0;

  const prevButton = document.querySelector(".nav-button:first-child");
  const nextButton = document.querySelector(".nav-button:last-child");
  const titleEl = document.querySelector(".card-title-chart");
  const chartEl = document.querySelector(".area-chart");

  function renderMetric(index) {
    const metric = metrics[index];
    titleEl.textContent = metric.title;
    chartEl.innerHTML = "";

    metric.data.forEach(item => {
      const areaItem = document.createElement("div");
      areaItem.className = "area-item";

      const nameSpan = document.createElement("span");
      nameSpan.className = "area-name";
      nameSpan.textContent = item.area;

      const barDiv = document.createElement("div");
      barDiv.className = "area-bar";
      barDiv.style.width = item.percent + "%";

      areaItem.appendChild(nameSpan);
      areaItem.appendChild(barDiv);
      chartEl.appendChild(areaItem);
    });
  }

  prevButton.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + metrics.length) % metrics.length;
    renderMetric(currentIndex);
  });

  nextButton.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % metrics.length;
    renderMetric(currentIndex);
  });

  renderMetric(currentIndex);
});

//Card de gráfico de áreas
document.addEventListener("DOMContentLoaded", function () {
  const activities = [
    { icon: "✓", color: "green", title: "7Novo Feedback recebido", time: "Há 2 horas" },
    { icon: "💡", color: "yellow", title: "8Maria Respondeu ao seu Feedback", time: "Há 2 horas" },
    { icon: "⚠", color: "red", title: "9Novo Feedback recebido", time: "Há 3 horas" },
    { icon: "✓", color: "green", title: "8Pedro Respondeu ao seu Feedback", time: "Há 4 horas" },
    { icon: "💡", color: "yellow", title: "7Novo Feedback recebido", time: "Há 5 horas" },
    { icon: "⚠", color: "red", title: "6Cláudia Respondeu ao seu Feedback", time: "Há 7 horas" },
    { icon: "✓", color: "green", title: "5Novo Feedback recebido", time: "Há 9 horas" },
    { icon: "💡", color: "yellow", title: "4João Respondeu ao seu Feedback", time: "Há 18 horas" },
    { icon: "⚠", color: "red", title: "3Novo Feedback recebido", time: "Há 24 horas" },
    { icon: "✓", color: "green", title: "2Novo Feedback recebido", time: "Há 2 horas" },
    { icon: "💡", color: "yellow", title: "1Maria Respondeu ao seu Feedback", time: "Há 2 horas" },
    { icon: "⚠", color: "red", title: "2Novo Feedback recebido", time: "Há 3 horas" },
    { icon: "✓", color: "green", title: "3Pedro Respondeu ao seu Feedback", time: "Há 4 horas" },
    { icon: "💡", color: "yellow", title: "4Novo Feedback recebido", time: "Há 5 horas" },
    { icon: "⚠", color: "red", title: "5Cláudia Respondeu ao seu Feedback", time: "Há 7 horas" },
    { icon: "✓", color: "green", title: "6Novo Feedback recebido", time: "Há 9 horas" },
    { icon: "💡", color: "yellow", title: "7João Respondeu ao seu Feedback", time: "Há 18 horas" },
    { icon: "⚠", color: "red", title: "8Novo Feedback recebido", time: "Há 24 horas" },
    { icon: "✓", color: "green", title: "9Novo Feedback recebido", time: "Há 2 horas" },
    { icon: "💡", color: "yellow", title: "8Maria Respondeu ao seu Feedback", time: "Há 2 horas" },
    { icon: "⚠", color: "red", title: "7Novo Feedback recebido", time: "Há 3 horas" },
    { icon: "✓", color: "green", title: "6Pedro Respondeu ao seu Feedback", time: "Há 4 horas" },
    { icon: "💡", color: "yellow", title: "5Novo Feedback recebido", time: "Há 5 horas" },
    { icon: "⚠", color: "red", title: "4Cláudia Respondeu ao seu Feedback", time: "Há 7 horas" },
    { icon: "✓", color: "green", title: "3Novo Feedback recebido", time: "Há 9 horas" },
    { icon: "💡", color: "yellow", title: "2João Respondeu ao seu Feedback", time: "Há 18 horas" },
    { icon: "⚠", color: "red", title: "1Novo Feedback recebido", time: "Há 24 horas" },
  ];  //Coloquei numeros antes das descrições para mostrar que de fato está passando para a página seguinte

  const itemsPerPage = 9;
  let currentPage = 0;
  const totalPages = Math.ceil(activities.length / itemsPerPage);

  const activityListEl = document.querySelector(".activity-list");
  const paginationText = document.querySelector(".pagination div:nth-child(2)");
  const prevBtn = document.querySelector(".pagination .nav-button:first-child");
  const nextBtn = document.querySelector(".pagination .nav-button:last-child");

  function renderActivities(page) {
    activityListEl.innerHTML = "";

    const start = page * itemsPerPage;
    const end = start + itemsPerPage;
    const pageItems = activities.slice(start, end);

    pageItems.forEach(activity => {
      const item = document.createElement("div");
      item.className = "activity-item";

      const icon = document.createElement("div");
      icon.className = `activity-icon ${activity.color}`;
      icon.textContent = activity.icon;

      const content = document.createElement("div");
      content.className = "activity-content";

      const title = document.createElement("div");
      title.className = "activity-title";
      title.textContent = activity.title;

      const time = document.createElement("div");
      time.className = "activity-time";
      time.textContent = activity.time;

      content.appendChild(title);
      content.appendChild(time);
      item.appendChild(icon);
      item.appendChild(content);
      activityListEl.appendChild(item);
    });

    paginationText.textContent = `${page + 1}/${totalPages}`;
  }

  prevBtn.addEventListener("click", () => {
    if (currentPage > 0) {
      currentPage--;
      renderActivities(currentPage);
    }
  });

  nextBtn.addEventListener("click", () => {
    if (currentPage < totalPages - 1) {
      currentPage++;
      renderActivities(currentPage);
    }
  });

  renderActivities(currentPage);
});