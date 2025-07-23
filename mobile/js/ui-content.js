//메인 나의업무
const updownToggle = () => {
    const listItems = document.querySelectorAll('.box.-work > ul > li');
    
    listItems.forEach(function (item) {
        const button = item.querySelector('button');

        button.addEventListener('click', function () {
            const isActive = item.classList.contains('on');
            listItems.forEach(li => li.classList.remove('on'));

            if (!isActive) {
                item.classList.add('on');
            }
        });
    });
};

// 탭
const tab = () => {
    const tabWraps = document.querySelectorAll('.tab-wrap');

    tabWraps.forEach(wrap => {
        const tabs = wrap.querySelectorAll('[role="tab"]');
        const panels = wrap.querySelectorAll('[role="tabpanel"]');

        tabs.forEach((tab, index) => {
            tab.addEventListener('click', function (e) {
                e.preventDefault();

                const currentWrap = tab.closest('.tab-wrap');
                const localTabs = currentWrap.querySelectorAll('[role="tab"]');
                const localPanels = currentWrap.querySelectorAll('[role="tabpanel"]');

                // 모든 탭/패널 비활성화
                localTabs.forEach(t => t.classList.remove('on'));
                localPanels.forEach(p => p.classList.remove('on'));

                // 현재 탭/패널 활성화
                tab.classList.add('on');
                localPanels[index].classList.add('on');

                const activePanel = localPanels[index];

                // 중첩된 tab-wrap 초기화
                const innerTabWrap = activePanel.querySelector('.tab-wrap');
                if (innerTabWrap) {
                    const innerTabs = innerTabWrap.querySelectorAll('[role="tab"]');
                    const innerPanels = innerTabWrap.querySelectorAll('[role="tabpanel"]');

                    innerTabs.forEach(t => t.classList.remove('on'));
                    innerPanels.forEach(p => p.classList.remove('on'));

                    // 첫 번째 탭/패널 활성화
                    innerTabs[0].classList.add('on');
                    innerPanels[0].classList.add('on');
                }
            });
        });
    });
};

// 메뉴 열기
const menuToggle = () => {
    const openBtn = document.querySelector('.menu-btn:not(.-close)');
    const closeBtn = document.querySelector('.menu-btn.-close');
    const sideMenu = document.querySelector('.side-menu');

    // 메뉴 열기
    openBtn.addEventListener('click', () => {
        sideMenu.classList.add('-open');
    });

    // 메뉴 닫기
    closeBtn.addEventListener('click', () => {
        sideMenu.classList.remove('-open');
    });
}

// 미결함 상세 열고닫기
const outstandingToggle = () => {
    const toggleBoxes = document.querySelectorAll(".-updownToggle");

    toggleBoxes.forEach(box => {
        const btn = box.querySelector(".updownBtn");
        const ul = box.querySelector("ul");

        btn.addEventListener("click", () => {
            const isOpen = box.classList.contains("on");

            if (isOpen) {
                // 닫기
                box.classList.remove("on");
                if (ul) ul.style.display = "none";
            } else {
                // 열기
                box.classList.add("on");
                if (ul) ul.style.display = "block";
            }
        });

        // 초기 상태 (on 없는 경우 ul 숨김)
        if (!box.classList.contains("on") && ul) {
            ul.style.display = "none";
        }
    });
}

//결재 진행상황 열고닫기
const approvalToggle = () => {
    document.querySelectorAll(".i-approval").forEach(button => {
        button.addEventListener("click", () => {
            // 현재 클릭된 버튼의 부모 요소 <strong>의 형제 중 다음 ul 찾기
            const parentLi = button.closest("li");
            if (!parentLi) return;

            const nextUl = parentLi.querySelector("ul");
            if (nextUl) {
                nextUl.classList.toggle("-open");
            }
        });
    });
}

window.addEventListener('load', () => {
    updownToggle();
    tab();
    outstandingToggle();
    approvalToggle();
});
