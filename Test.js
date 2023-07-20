const REQUEST_URL = "http://localhost:5291/api/TaxpayerTrial/DeliverTaxReturn";
const GENERATE_UUID = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx";
const ERROR_MESSAGE = "Error occurred while submitting the Form.";
const ERROR_WARNING = "Something went wrong.";

function getRequestId() {
  return GENERATE_UUID.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

window.addEventListener("load", function () {
  setTimeout(() => {
    const form = document.querySelector("form");
    form.addEventListener("submit", submitRegistration);
    function submitRegistration(event) {
      event.preventDefault();
      const uuId = getRequestId();
      const emailAddress = document.querySelector('input[type="email"]');
      const engagementType = document.querySelector(
        'select[name="engagement_type"]'
      );
      if (emailAddress.value === "" || engagementType.value === "") {
        return;
      }
      const requestData = {
        requestId: uuId,
        emailAddress: emailAddress.value,
        engagementType: engagementType.value,
      };
      fetch(REQUEST_URL, {
        method: "POST",
        body: JSON.stringify(requestData),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then(function (response) {
          if (response.ok) {
            return response.text();
          }
          throw new Error(ERROR_MESSAGE);
        })

        .then(function (data) {
          var link = data;
          window.open(link, "_blank");
        })
        .catch(function (error) {
          console.warn(ERROR_WARNING, error);
        });
    }
  }, 2000);
});
