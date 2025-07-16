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

window.addEventListener('load', () => {
    updownToggle();
    tab();
});
