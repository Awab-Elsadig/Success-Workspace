const infoButton = document.querySelector(".info--button");
const infoPopup = document.querySelector(".info--popup");
const overlay = document.querySelector(".overlay");
infoPopup.innerHTML = `
<h3 class="info__title">التعليمات</h3>
<hr class="info__hr" />
<h4 class="info__subtitle booking--subtitle">تعليمات الحجز :</h4>
<ol class="info__list booking--list">
   <li>الحد الأقصى للفرد 3 كراسي.</li>
   <li>سيتم إرسال رسالة لتأكيد الحجز.</li>
   <li>الحجز سيلغى خلال ساعة من التأكيد في حال عدم الحضور.</li>
</ol>
<h4 class="info__subtitle main--subtitle">تعليمات عامة :</h4>
<ol class="info__list main--list">
   <li>مشروب مجاني لكل فرد.</li>
   <li>احترام المكان والهدوء.</li>
</ol>
<h4 class="info__subtitle data--subtitle">تعليمات البيانات :</h4>
<ol class="info__list data--list">
   <li>يرجى إدخال بيانات صحيحة لأنه سيتم التواصل معكم من خلالها.</li>
   <li>إحترام المكان والهدوء.</li>
</ol>
`;

infoButton.addEventListener("click", () => {
   overlay.classList.toggle("open");
   infoPopup.classList.toggle("open");
});

overlay.addEventListener("click", () => {
   overlay.classList.remove("open");
   infoPopup.classList.remove("open");
})
