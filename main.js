$('#cekrekening').on("click", function () {
    const accountNumber = $("#accountNumber").val();
    const accountBank = $("#accountBank").val();
    if (accountBank === null || accountBank === "" || accountBank === "0") {
        $("#accbank-msg").text("*Required").css({
            color: "red",
            "text-align": "right",
            "top": "0"
        });
        setTimeout(() => {
            $("#accbank-msg").text("");
        }, 1500);
    }
    else if (accountNumber === undefined || accountNumber === null || accountNumber === "") {
        $("#accnum-msg").text("*Required").css({
            color: "red",
            "text-align": "right",
            "top": "0"
        });
        setTimeout(() => {
            $("#accnum-msg").text("");
        }, 1500);
    } else if (accountNumber.length < 10) {
        $("#accnum-msg").text("*Please input above 10 characters").css({
            color: "red",
            "text-align": "right",
            "top": "0"
        });
        setTimeout(() => {
            $("#accnum-msg").text("");
        }, 1500);
    } else {
        $.ajax({
            url: "https://netovas.com/api/cekrek/v1/account-inquiry",
            type: "POST",
            data: {
                account_bank: $("#accountBank").val(),
                account_number: $("#accountNumber").val(),
            },
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            beforeSend: function () {
                $('#result-txt').fadeOut('fast', 'linear');
                $("#result").attr("readonly", true);
                $("#cekrekening")
                    .attr("disabled", "true")
                    .html(
                        "Cek Nama &nbsp;<i class='fas fa-sync fa-spin'></i>"
                    );
            },
            success: function (response) {
                $("#cekrekening")
                    .removeAttr("disabled")
                    .html("Cek Nama");
                $("#result-txt").fadeIn('fast', 'linear');
                $('#result').html(`
                <i class="fa-regular fa-circle-check"></i> <strong>${response.data.account_holder}</strong>
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
                `).removeClass("alert-danger").addClass("alert-success");
            },
            error: function (response) {
                $("#cekrekening")
                    .removeAttr("disabled")
                    .html("Cek Nama");
                $("#result-txt").fadeIn('fast', 'linear');
                $('#result').html(`
                <i class="fa-regular fa-circle-xmark"></i> <strong>${response.responseJSON.message}</strong>
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
                `).removeClass("alert-success").addClass("alert-danger");
            }
        })
    }
});
