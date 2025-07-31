
// 그리드 리사이징
// $(window).resize(function() {
//     var newWidth = $(".container").width(); // 부모 요소의 너비를 가져옵니다.
//     $(".table-jq table").jqGrid('setGridWidth', newWidth); // 그리드 너비를 조정합니다.
// });

$(window).resize(function () {
    $(".table-jq").each(function () {
        var $wrapper = $(this);
        var $table = $wrapper.find("table");
        var newWidth = $wrapper.width();
        $table.jqGrid('setGridWidth', newWidth);
    });
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
    const allRows = document.querySelectorAll('.search-box:not(.-nobtn) tbody tr');
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
        const button = li.querySelector('button');

        // 새로고침 버튼 처리
        if (button) {
            button.addEventListener('click', e => {
                e.stopPropagation();
                e.preventDefault();
            });
        }

        if (submenu) {
            li.classList.add('has-submenu');

            li.addEventListener('click', e => {
                // 만약 클릭된 대상이 하위 메뉴 내의 a 태그라면 무시
                const clickedInsideSubmenu = submenu.contains(e.target);

                if (clickedInsideSubmenu) {
                    // 하위 메뉴 클릭이면 메뉴 토글하지 않음
                    return;
                }

                // 기본 동작 차단
                e.stopPropagation();
                e.preventDefault();

                const isOpen = li.classList.contains('on');

                menuliAll.forEach(item => {
                    item.classList.remove('on');
                });

                if (!isOpen) {
                    li.classList.add('on');
                }
            });
        }
    });
}

// 레이아웃 변경시 jqgrid 그려주기
const resizeJqGrid = (container) => {
    const grid = container.querySelector('table[id^="grid"]');
    if (grid && $(grid).length > 0) {
        const tableJq = container.querySelector('.table-jq');
        if (tableJq) {
            const width = tableJq.clientWidth;
            $(grid).jqGrid('setGridWidth', width);
        }
    }
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

                // jqGrid 다시 그리기
                resizeJqGrid(activePanel);

                // FullCalendar 다시 그리기
                const calendarEl = activePanel.querySelector('#calendar');
                if (calendarEl && calendarEl._fullCalendar) {
                    calendarEl._fullCalendar.render();
                }

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

                    const innerActivePanel = innerPanels[0];

                    // 중첩 jqGrid 다시 그리기
                    resizeJqGrid(innerActivePanel);

                    // 중첩 FullCalendar 다시 그리기
                    const innerCalendarEl = innerActivePanel.querySelector('#calendar');
                    if (innerCalendarEl && innerCalendarEl._fullCalendar) {
                        innerCalendarEl._fullCalendar.render();
                    }
                }
            });
        });
    });
};

// sidemenu 토글
const sideNavToggle = () => {
    const btn = document.querySelector('.side-btn');
    const wrap = document.querySelector('.wrap');
    const calendarEl = document.querySelector('.calendar-wrap #calendar');

    btn.addEventListener("click", () => {
        wrap.classList.toggle('sidem-close');

        //그리드 다시 그려주기(탭안에 그리드 제외됨)
        const allGridsInContainer = document.querySelectorAll('.container table[id^="grid"]');
        allGridsInContainer.forEach(grid => {
            const tableJq = grid.closest('.table-jq') || grid.closest('#ggg');
            if (tableJq) {
                const width = tableJq.clientWidth;
                $(grid).jqGrid('setGridWidth', width);
            }
        });

        //탭안에 그리드 그려주기
        const currentPanel = document.querySelector('.tab-wrap .panels > div.on');
        if (currentPanel) {
            resizeJqGrid(currentPanel);
        }

        // 캘린더 그려주기
        if (calendarEl && calendarEl._fullCalendar) {
            calendarEl._fullCalendar.updateSize();
        }
    });
}

// 챗봇
const chatToggle = () => {
    const charWrap = document.querySelector('.chat-wrap');
    const bigsizebtn = document.querySelector('.chat-sideMenu button');

    if (!charWrap || !bigsizebtn) return;

    bigsizebtn.addEventListener('click', () => {
        charWrap.classList.toggle('open');
    });
};

// 통합게시판 스크롤 (400X420)
const tablistScroll = () => {
    const tablist = document.querySelector('.board-wrap.s400 .tablist');
    if (!tablist) return; // 요소가 없으면 함수 종료

    let isDown = false;
    let startX;
    let scrollLeft;

    tablist.addEventListener('mousedown', (e) => {
        isDown = true;
        tablist.classList.add('active');
        startX = e.pageX - tablist.offsetLeft;
        scrollLeft = tablist.scrollLeft;
        tablist.style.cursor = 'grabbing';
    });

    tablist.addEventListener('mouseleave', () => {
        isDown = false;
        tablist.style.cursor = 'grab';
    });

    tablist.addEventListener('mouseup', () => {
        isDown = false;
        tablist.style.cursor = 'grab';
    });

    tablist.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - tablist.offsetLeft;
        const walk = (x - startX) * 5; // 이동 감도 조절
        tablist.scrollLeft = scrollLeft - walk;
    });
}

// 메인>실험실(다이얼 돌리기)
const laboratoryDial = () => {
    const circle = document.querySelector('.circle');
    if (!circle) return; // 예외 처리

    const linkItems = circle.querySelectorAll('ul li');
    const anchorItems = circle.querySelectorAll('ul li a');
    const centerX = circle.clientWidth / 2;
    const centerY = circle.clientHeight / 2;

    let startAngle = 0;
    let prevAngle = 0;
    let currentAngle = 0;
    let rotateStart = 0;
    let rotateEnd = 0;
    const angleStep = 3.5;

    let isDragging = false;
    let hasMoved = false;

    circle.addEventListener('mousedown', (e) => {
        isDragging = true;
        hasMoved = false;
        startAngle = getAngle(e.clientX, e.clientY);
        prevAngle = startAngle;
        rotateStart = Number(circle.dataset.rotate);
    });

    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;

        hasMoved = true;
        prevAngle = currentAngle;
        currentAngle = getAngle(e.clientX, e.clientY);
        if (Math.abs(prevAngle - currentAngle) > 300) return;

        const currentRotate = Number(circle.dataset.rotate);
        circle.dataset.rotate = prevAngle < currentAngle
            ? currentRotate - angleStep
            : currentRotate + angleStep;

        rotateEnd = Number(circle.dataset.rotate);
        updateRotation();
    });

    document.addEventListener('mouseup', (e) => {
        if (!isDragging) return;
        isDragging = false;

        // a 태그 위에서 마우스 뗐는지 확인
        const isOverAnchor = e.target.closest('a');

        // a 태그 위에서 마우스를 뗀 경우 snap 하지 않음
        if (hasMoved && !isOverAnchor) {
            snapToNearestAngle();
        }
    });

    // Prevent link click when dragging
    // anchorItems.forEach(anchor => {
    //     anchor.addEventListener('click', (e) => {
    //         if (hasMoved) {
    //             e.preventDefault();
    //             e.stopPropagation();
    //         }
    //         alert('ok');
    //     });
    // });

    linkItems.forEach(item => {
        item.addEventListener('click', (e) => {
            if (hasMoved) {
                e.preventDefault();
                e.stopPropagation();
                return;
            }
        });
    });


    function updateRotation() {
        circle.style.transform = `rotate(${circle.dataset.rotate}deg)`;
        linkItems.forEach(el => {
            el.style.transform = `rotate(${-1 * circle.dataset.rotate}deg)`;
        });
    }

    function getAngle(x, y) {
        const dx = x - circle.offsetLeft - centerX;
        const dy = -1 * (y - circle.offsetTop - centerY);
        const radian = Math.atan2(dy, dx);
        let degree = radian * 180 / Math.PI;
        return degree < 0 ? degree + 360 : degree;
    }

    function snapToNearestAngle() {
        let angle = Number(circle.dataset.rotate);
        const step = parseInt(angle / 45);
        const remainder = Math.abs(angle) % 45;

        if (remainder > 22.5) {
            angle = step * 45 + (rotateStart < rotateEnd ? 45 : -45);
        } else {
            angle = step * 45;
        }

        circle.dataset.rotate = angle;
        updateRotation();
    }
};

// 메인>실험실 클릭시 다이얼 노출
const laboratoryShow = () =>{
    const btn = document.querySelector('.laboratory>a');
    const container = document.querySelector('.laboratory-wrap');
    const closeBtn = container.querySelector('button');

    btn.addEventListener('click', e => {
        e.stopPropagation();
        e.preventDefault();

        container.classList.add('open');
    })

    closeBtn.addEventListener('click', e => {
        e.stopPropagation();
        e.preventDefault();

        container.classList.remove('open');
    })
}

// 헤더 사용자 정보버튼 클릭시 정보 노출
const userInfoLayout = () => {
    const profile = document.querySelector('.profile');
    if (!profile) return;

    const profileWrap = profile.querySelector('.profile-wrap');
    if (!profileWrap) return;

    profile.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        profileWrap.classList.toggle('-open');
    });

    profileWrap.addEventListener('click', function (e) {
        e.stopPropagation();
    });

    // 문서 클릭 시 .profile 외부면 닫기
    document.addEventListener('click', function (e) {
        if (!profile.contains(e.target)) {
            profileWrap.classList.remove('-open');
        }
    });
};

// 개인위젯설정>위젯설정 클릭시 삭제버튼 보임
const widgetClick = () => {
    const onElements = document.querySelectorAll('.set-container .on');

    onElements.forEach(el => {
        el.addEventListener('click', function (e) {
            // 내부 버튼 클릭은 무시
            if (e.target.tagName === 'BUTTON') return;

            // 모든 요소에서 active 제거
            onElements.forEach(item => item.classList.remove('active'));

            // 클릭한 요소에 active 추가
            this.classList.add('active');
        });
    });
}

// 개인위젯설정>위젯목록 드래그 하여 위젯설정 바꿈
const widgetDrag = () => {
    const setList = document.querySelector('.set-list ul');

    // .set-list 항목을 드래그 가능하게
    document.querySelectorAll('.set-list li').forEach(item => {
        item.setAttribute('draggable', true);

        item.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', item.textContent.trim());
            item.classList.add('dragging');
        });

        item.addEventListener('dragend', () => {
            item.classList.remove('dragging');
        });
    });

    // .set-container .on 요소들을 drop 대상으로 설정
    document.querySelectorAll('.set-container .on').forEach(target => {
        target.setAttribute('droppable', true);

        target.addEventListener('dragover', (e) => {
            e.preventDefault();
            target.classList.add('drop-hover');
        });

        target.addEventListener('dragleave', () => {
            target.classList.remove('drop-hover');
        });

        target.addEventListener('drop', (e) => {
            e.preventDefault();
            target.classList.remove('drop-hover');

            const newText = e.dataTransfer.getData('text/plain');
            const draggedItem = document.querySelector('.set-list li.dragging');

            if (newText && draggedItem) {
                // 기존 .on 안의 텍스트만 추출 (삭제 버튼 제외)
                const oldText = target.cloneNode(true).childNodes[0].textContent.trim();

                // 1. 기존 내용을 .set-list에 추가
                const newLi = document.createElement('li');
                newLi.textContent = oldText;
                newLi.setAttribute('draggable', true);
                setList.appendChild(newLi);

                // 새로 추가된 항목도 다시 드래그 가능하게
                newLi.addEventListener('dragstart', (e) => {
                    e.dataTransfer.setData('text/plain', newLi.textContent.trim());
                    newLi.classList.add('dragging');
                });
                newLi.addEventListener('dragend', () => {
                    newLi.classList.remove('dragging');
                });

                // .on 영역 내용 교체
                target.innerHTML = `${newText}<button type="button" class="btn -sm -line">삭제</button>`;

                // 드래그된 항목 제거
                draggedItem.remove();
            }
        });
    });
}

//결재 진행상황 열고닫기
const approvalToggle = () => {
    const approvalButtons = document.querySelectorAll('.updown');

    approvalButtons.forEach(button => {
        button.addEventListener('click', function () {
            const parentLi = this.closest('li'); // 현재 버튼이 속한 li
            if (!parentLi) return;

            // 토글 대상 찾기
            const setProgress = parentLi.querySelector('.set-progress');
            const subUl = parentLi.querySelector('ul');

            // set-progress 토글
            if (setProgress) {
                setProgress.classList.toggle('-open');
            }

            // li안의 ul 토글 (set-progress가 없으면)
            if (subUl && subUl !== setProgress) {
                subUl.classList.toggle('-open');
            }
        });
    });
};

window.addEventListener('load', () => {
    toggleTable();
    tab();
    chatToggle();
    tablistScroll();
    widgetClick();
    widgetDrag();
    approvalToggle();
});
