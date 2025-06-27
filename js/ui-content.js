
// 그리드 리사이징
$(window).resize(function() {
    var newWidth = $(".container").width(); // 부모 요소의 너비를 가져옵니다.
    $(".table-jq table").jqGrid('setGridWidth', newWidth); // 그리드 너비를 조정합니다.
});

// 달력 한국어 출력
(function (index_js) {
    'use strict';

    var locale = {
        code: 'ko',
        buttonText: {
            prev: '이전달',
            next: '다음달',
            today: '오늘',
            year: '년도',
            month: '월',
            week: '주',
            day: '일',
            list: '일정목록',
        },
        weekText: '주',
        allDayText: '종일',
        moreLinkText: '개',
        noEventsText: '일정이 없습니다',
    };

    index_js.globalLocales.push(locale);

})(FullCalendar);


//jqgrid 페이징
const createCustomPager = (gridId, pagerSelector) => {
    const grid = $(`#${gridId}`);
    const currentPage = grid.getGridParam("page");
    const totalPages = grid.getGridParam("lastpage");

     // 페이징 영역 비우기
    if (!totalPages || totalPages <= 1) {
        $(pagerSelector).empty();
        return;
    }

    const createButton = (label, page, isDisabled, className = "") => {
        return `
        <li class="${className}">
            <button class="page-btn${isDisabled ? " disabled" : ""}" 
                    ${isDisabled ? "disabled" : `data-page="${page}"`}>
                ${label}
            </button>
        </li>`;
    };

    let pagerHtml = "<ul>";

    // 처음 페이지
    pagerHtml += createButton("처음", 1, currentPage === 1, "first");
    // 이전 페이지
    pagerHtml += createButton("이전", currentPage - 1, currentPage === 1, "prev");

    // 페이지 번호 버튼
    for (let i = 1; i <= totalPages; i++) {
        const isCurrent = i === currentPage;
        pagerHtml += createButton(i, i, isCurrent, isCurrent ? "current" : "");
    }

    // 다음 페이지
    pagerHtml += createButton("다음", currentPage + 1, currentPage === totalPages, "next");
    // 마지막 페이지
    pagerHtml += createButton("마지막", totalPages, currentPage === totalPages, "last");

    pagerHtml += "</ul>";

    $(pagerSelector).html(pagerHtml);

    $(pagerSelector).find(".page-btn").on("click", function () {
        const targetPage = $(this).data("page");
        if (targetPage) {
            grid.trigger("reloadGrid", [{ page: Number(targetPage) }]);
        }
    });
};

// 조회영역 2행 미만이면 더보기 버튼 숨기기
const toggleTableReset = () => {
    const allRows = document.querySelectorAll('.search-box tbody tr');
    const toggleContainer = document.querySelector('.search-close');

    if (allRows.length < 2) {
        toggleContainer.style.display = 'none';
    } else {
        allRows.forEach((row, index) => {
            if (index >= 1) row.classList.add('hidden');
        });
    }
}

// 조회영역
const toggleTable = () => {
    let isExpanded = false;
    const rowBtn = document.querySelector('.search-close');

    if(rowBtn) {
        toggleTableReset();
    } else return;

    function toggleRows() {
        console.log('ok')
        const extraRows = document.querySelectorAll('.hidden');
        const btn = document.querySelector('.search-close');
        isExpanded = !isExpanded;

        extraRows.forEach(row => {
            row.style.display = isExpanded ? 'table-row' : 'none';
        });

        btn.textContent = isExpanded ? '닫기' : '더보기';
        btn.classList = isExpanded ? 'search-close n' : 'search-close';
    }

    rowBtn.addEventListener('click', () => {
        toggleRows();
    });
}

// 메뉴
const navToggle = () => {
    const nav = document.querySelector('nav');
    const subUI = nav.querySelector('.sub-gnb > ul.on');
    const menuliAll = subUI.querySelectorAll("li");

    menuliAll.forEach(li => {
        const submenu = li.querySelector('ul');

        if (submenu) { // 메뉴 중 하위메뉴 있는 항목
            li.classList.add('has-submenu');

            li.addEventListener('click', e => {
                e.stopPropagation();
                e.preventDefault();

                const isOpen = li.classList.contains('on');

                menuliAll.forEach(item => {
                    item.classList.remove('on');
                });

                if (!isOpen) {
                    li.classList.add('on'); // 현재 클릭한 메뉴 강조
                }
            });
        }
    });
}

// 탭
const tab = () => {
    const tabWraps = document.querySelectorAll('.tab-wrap');

    tabWraps.forEach(wrap => {
        const tabs = wrap.querySelectorAll('[role="tab"]');
        const panels = wrap.querySelectorAll('[role="tabpanel"]');

        tabs.forEach((tab, index) => {
            tab.addEventListener('click', function (e) {
                e.preventDefault();

                // 해당 tab-wrap 내 모든 탭과 패널에서 'on' 클래스 제거
                tabs.forEach(t => t.classList.remove('on'));
                panels.forEach(p => p.classList.remove('on'));

                // 클릭한 탭과 해당 인덱스의 패널에 'on' 클래스 추가
                tab.classList.add('on');
                panels[index].classList.add('on');

                const grid = panels[index].querySelector('table[id^="grid"]');
                if (grid && $(grid).length > 0) {
                    const panelWidth = panels[index].clientWidth;
                    $(grid).jqGrid('setGridWidth', panelWidth);
                }
            });
        });
    });
};

window.addEventListener('load', () => {
    toggleTable();
    tab();
});
