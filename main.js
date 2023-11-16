document.addEventListener("DOMContentLoaded", () => {
  let currentTab = 0;
  showCurrentTab(currentTab);

  function showCurrentTab(n) {
    const tabs = document.querySelectorAll(".tab");
    tabs[n].style.display = "block";

    if (n == 0) {
      document.querySelector("#prev").style.display = "none";
    } else {
      document.querySelector("#prev").style.display = "inline";
    }

    if (n == tabs.length - 1) {
      document.querySelector("#next").textContent = "Confirm";
    } else {
      document.querySelector("#next").style.display = "inline";
    }

    fixStepIndicator(n);
  }

  function nextPrev(n) {
    // This function will figure out which tab to display
    var x = document.getElementsByClassName("tab");
    // Exit the function if any field in the current tab is invalid:

    const plans = document.querySelectorAll("#plan");

    const plan = Array.from(plans).find((plan) =>
      Array.from(plan.classList).includes("plan__active")
    );

    console.log(plan);

    const prices = Array.from(
      document.querySelectorAll("#add-on #add-on-price")
    );
    if (plan.querySelector("#promo-text").style.display == "block") {
      prices[0].textContent = "$10/yr";
      prices[1].textContent = "$20/yr";
      prices[2].textContent = "$20/yr";
    } else {
      prices[0].textContent = "$1/mo";
      prices[1].textContent = "$2/mo";
      prices[2].textContent = "$2/mo";
    }

    var checkedInput = Array.from(
      document.querySelectorAll("#add-on input")
    ).filter((input) => {
      return input.checked;
    });

    console.log(checkedInput);

    const summary = document.querySelector("#bill-monthly");
    summary.querySelector("#plan-plan").textContent = plan
      .querySelector("#plan-price")
      .textContent.endsWith("r")
      ? plan.querySelector("#plan-name").textContent + " (yearly)"
      : plan.querySelector("#plan-name").textContent + " (monthly)";
    summary.querySelector("#summary-plan-price").textContent =
      plan.querySelector("#plan-price").textContent;

    const billSummary = document.querySelectorAll("#bill-container-add-on");

    if (currentTab == 2) {
      billSummary.forEach((div) => (div.textContent = ""));
      checkedInput.forEach((div, i) => {
        billSummary[i].insertAdjacentHTML(
          "afterbegin",
          `<div id="div" class="basis-[80%]">
                      <p class="font-bold">${checkedInput[i].value}</p>
                    </div>
                    <p id="bill-add-on" class="font-bold">${
                      checkedInput[i].closest(".flex.items-center")
                        .lastElementChild.textContent
                    }</p>`
        );
      });
    }

    const billAddon = Array.from(document.querySelectorAll("#bill-add-on"))
      .map((div) => +/([$])(\d+)([/]\w+)/.exec(div.textContent)[2])
      .reduce((num, acc) => num + acc, 0);
    const planPlanAddOn = +/([$])(\d+)([/]\w+)/.exec(
      summary.querySelector("#summary-plan-price").textContent
    )[2];

    summary.querySelector("#everything-total").textContent = plan
      .querySelector("#plan-price")
      .textContent.endsWith("r")
      ? `$${billAddon + planPlanAddOn}/yr`
      : `$${billAddon + planPlanAddOn}/mo`;
    /*  console.log(billAddon);
    console.log(
      +/([$])(\d+)([/]\w+)/.exec(
        summary.querySelector("#summary-plan-price").textContent
      )[2]
    );
    console.log(
      +/([$])(\d+)([/]\w+)/.exec(
        summary.querySelector("#everything-total").textContent
      )[2]
    ); */

    if (n == 1 && !validateForm()) return false;
    // Hide the current tab:
    x[currentTab].style.display = "none";
    // Increase or decrease the current tab by 1:
    currentTab = currentTab + n;
    // if you have reached the end of the form... :
    if (currentTab >= x.length) {
      //...the form gets submitted:
      document.getElementById("regForm").submit();
      return false;
    }
    // Otherwise, display the correct tab:
    showCurrentTab(currentTab);
  }

  document.querySelector("#prev").addEventListener("click", (e) => {
    e.preventDefault();
    nextPrev(-1);
  });

  document.querySelector("#next").addEventListener("click", (e) => {
    e.preventDefault();

    nextPrev(1);
  });

  const plans = Array.from(document.querySelectorAll("#plan"));
  plans.forEach((div) =>
    div.addEventListener("click", (e) => {
      plans.forEach((plan) => {
        plan.classList.remove("plan__active");
        plan.style.borderColor = "gray";
      });
      if (e.target == div) {
        e.target.classList.add("plan__active");
        e.target.style.borderColor = "blue";
      }
    })
  );

  function validateForm() {
    // This function deals with validation of the form fields
    var x,
      y,
      i,
      valid = true;
    x = document.getElementsByClassName("tab");
    y = x[currentTab].getElementsByTagName("input");
    // A loop that checks every input field in the current tab:
    for (i = 0; i < y.length; i++) {
      // If a field is empty...
      console.log(y[i].value);
      if (y[i].value == "") {
        // add an "invalid" class to the field:
        y[i].previousElementSibling.style.display = "inline";
        y[i].style.borderColor = "red";
        // and set the current valid status to false:
        valid = false;
      }
    }
    // If the valid status is true, mark the step as finished and valid:
    if (valid) {
      document.querySelectorAll("#step span")[currentTab].className +=
        " finish";
    }
    return valid; // return the valid status
  }

  function fixStepIndicator(n) {
    // This function removes the "active" class of all steps...
    var i,
      x = document.querySelectorAll("#step span");
    for (i = 0; i < x.length; i++) {
      x[i].className = x[i].className.replace(" bg-gray-400", "");
    }
    //... and adds the "active" class to the current step:
    x[n].className += " bg-gray-400";
  }

  const toggleMonthly = document.querySelector("#toggle");
  const promoText = document.querySelectorAll("#promo-text");
  const planText = document.querySelectorAll("#plan-price");
  toggleMonthly.addEventListener("click", (e) => {
    const toggle = toggleMonthly.firstElementChild;
    if (toggle.style.justifyContent == "end") {
      toggle.style.justifyContent = "start";
      toggle.style.marginLeft = "";
      Array.from(promoText).forEach((text) => (text.style.display = "none"));
      Array.from(planText).forEach(
        (text, i) => (text.textContent = `$${9 + i * 3}/mo`)
      );
    } else {
      toggle.style.justifyContent = "end";
      toggle.style.marginLeft = "auto";
      Array.from(promoText).forEach((text) => (text.style.display = "block"));
      Array.from(planText).forEach(
        (text, i) => (text.textContent = `$${90 + i * 30}/yr`)
      );
    }
  });
});
