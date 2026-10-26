const contactForm = document.querySelector("#contact-form");
const formStatus = document.querySelector("#form-status");
const projectModal = document.querySelector("#project-modal");
const modalCloseButton = projectModal.querySelector(".modal-close");
let previouslyFocusedCard = null;

const projectDetails = {
  "group-buy": {
    title: "공동구매 모바일 앱",
    description: "관심 상품을 이웃과 함께 구매하고 진행 상황을 확인하는 공동구매 서비스입니다.",
    role: "팀원으로 참여해 화면 구성과 상품 목록·상세 화면 구현을 담당한 예시입니다.",
    technologies: ["HTML, CSS, JavaScript", "모바일 우선 반응형 레이아웃", "LocalStorage 기반 장바구니 예시"],
    outcomes: ["상품 탐색부터 공동구매 신청까지의 흐름을 한 화면에서 확인하도록 구성", "작은 화면에서도 주요 버튼을 쉽게 찾을 수 있도록 화면 간격을 정리"]
  },
  "re-blue": {
    title: "RE-BLUE",
    description: "바다 생태계와 재활용을 주제로 한 교육용 게임 프로젝트입니다.",
    role: "게임 기획 보조와 Unity 씬 구성, 플레이 화면 UI 제작을 담당한 예시입니다.",
    technologies: ["Unity", "C#", "2D UI 및 씬 구성"],
    outcomes: ["재활용 분류를 게임 규칙에 연결해 학습 요소를 플레이에 반영", "단계별 목표 안내를 추가해 처음 플레이하는 사용자도 진행 방법을 파악"]
  },
  "study-pulse": {
    title: "학습 기록 대시보드 (예시)",
    description: "학습 시간과 목표 달성 현황을 한눈에 보여주는 웹 대시보드 예시 프로젝트입니다.",
    role: "화면 설계, 반응형 UI 구현, 학습 통계 시각화를 담당한 예시입니다.",
    technologies: ["HTML, CSS, Vanilla JavaScript", "CSS Grid 및 Flexbox", "간단한 SVG 차트"],
    outcomes: ["주간 학습 현황과 목표 진행률을 한 화면에서 확인", "모바일에서도 요약 정보가 먼저 보이도록 콘텐츠 우선순위를 조정"]
  }
};

// 선택한 프로젝트의 내용을 모달에 채워 표시합니다.
function renderProjectDetails(project) {
  projectModal.querySelector("#modal-title").textContent = project.title;
  projectModal.querySelector("#modal-description").textContent = project.description;
  projectModal.querySelector("#modal-role").textContent = project.role;

  const technologyList = projectModal.querySelector("#modal-technologies");
  technologyList.replaceChildren(
    ...project.technologies.map((technology) => {
      const item = document.createElement("li");
      item.textContent = technology;
      return item;
    })
  );

  const outcomeList = projectModal.querySelector("#modal-outcomes");
  outcomeList.replaceChildren(
    ...project.outcomes.map((outcome) => {
      const item = document.createElement("li");
      item.textContent = outcome;
      return item;
    })
  );
}

// 모달을 열고, 닫을 때 돌아갈 카드에 포커스를 저장합니다.
function openProjectDetails(card) {
  const project = projectDetails[card.dataset.project];

  if (!project) {
    throw new Error(`프로젝트 상세 데이터를 찾을 수 없습니다: ${card.dataset.project}`);
  }

  previouslyFocusedCard = card;
  renderProjectDetails(project);
  projectModal.showModal();
  modalCloseButton.focus();
}

// 모달을 닫고 원래 선택했던 프로젝트 카드로 포커스를 돌려줍니다.
function closeProjectDetails() {
  if (projectModal.open) {
    projectModal.close();
  }
}

document.querySelectorAll(".project-card").forEach((card) => {
  card.addEventListener("click", () => openProjectDetails(card));
  card.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openProjectDetails(card);
    }
  });
});

modalCloseButton.addEventListener("click", closeProjectDetails);

// ESC와 Tab 키를 처리해 키보드로도 모달을 안전하게 조작할 수 있게 합니다.
projectModal.addEventListener("cancel", (event) => {
  event.preventDefault();
  closeProjectDetails();
});

projectModal.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    event.preventDefault();
    closeProjectDetails();
    return;
  }

  if (event.key !== "Tab") {
    return;
  }

  event.preventDefault();
  modalCloseButton.focus();
});

projectModal.addEventListener("click", (event) => {
  if (event.target === projectModal) {
    closeProjectDetails();
  }
});

projectModal.addEventListener("close", () => {
  previouslyFocusedCard?.focus();
});

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(contactForm);
  const name = formData.get("name");

  formStatus.textContent = `${name}님, 메시지를 확인했습니다. 곧 답변드릴게요!`;
  contactForm.reset();
});
