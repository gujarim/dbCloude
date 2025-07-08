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
window.addEventListener('load', () => {
    updownToggle();
});
