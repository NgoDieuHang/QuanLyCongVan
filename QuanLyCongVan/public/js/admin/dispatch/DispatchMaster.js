    var msg_err_file = [MsgNo.ChuaChonFile];
    $(document).ready(function () {
        try {
            Init();
            InitEvents();
        }
        catch (e) {
            jMessage(0, function (ok) {
            }, '<b>ready:</b> ' + e.message, 4);
        }
    });
    function Init() {
        try {
            setTabIndexMenu();
            $('[tabindex=1]').focus();
            if ($('#imageName').val() != '') {
                msg_err_file[0] = 0;
            }
            CheckLoaiCongVan($('#IdLoaiCongVan').val());
        }
        catch (e) {
            jMessage(0, function (ok) {
            }, '<b>Init:</b> ' + e.message, 4);
        }
    }

    function InitEvents() {
        try {
            $('#btn-save').on('click', function () {
                SaveDispatch();
            });
            $(document).on('change', '#IdLoaiCongVan', function () {
                CheckLoaiCongVan($('#IdLoaiCongVan').val());
            });
        }
        catch (e) {
            jMessage(0, function (ok) {
            }, '<b>InitEvents:</b> ' + e.message, 4);
        }
    }
    function SaveDispatch() {
        try {
            var err1 = validate("#form-dispatch-main");
            var err2 = ValidateFile(0);
            if (!err1 && !err2) {
                $('#form-dispatch-main').ajaxSubmit({
                    beforeSubmit: function (a, f, o) {
                        o.dataType = 'json';
                    },
                    complete: function (XMLHttpRequest, textStatus) {
                        var res = XMLHttpRequest.responseJSON;
                        if (res.Code === 200) {
                            jMessage(15, function () {
                                window.location = url.editDispatch;
                            });
                        }
                        else if (res.Code === 201) {
                            fillError(res.ListError, '#form-dispatch-trans');
                            $('.item-error').first().focus();
                        } else {
                            jMessage(res.MsgNo, function () {
                                $('[tabindex=1]').focus();
                            });
                        }
                    },
                });
            }
            else {
                $('.item-error').first().focus();
            }
        }
        catch (e) {
            jMessage(0, function (ok) {
            }, '<b>SaveDispatch:</b> ' + e.message, 4);
        }
    }
    function CheckLoaiCongVan(idLoaiCongVan) {
        if (idLoaiCongVan == 1) {
            $('.cvd-area').removeClass('hidden');
        } else {
            $('.cvd-area').addClass('hidden');
        }
    }