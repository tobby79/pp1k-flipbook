define(function (require, exports, module) {

    "use strict";

    var _$tbar;
    
    // --------------------------------------------------------------------//
    // --------------------------- 이벤트 ---------------------------------//
    // --------------------------------------------------------------------//
    // ----------------------------------------------------------------------
    // 페이지가 로드 되었을때 ...
    // ----------------------------------------------------------------------
    Toast.on(Toast.Events.PAGE_DID_LOAD, function(page) {});

    // ----------------------------------------------------------------------
    // 페이지가 언로드 되었을때 ...
    // ----------------------------------------------------------------------
    Toast.on(Toast.Events.PAGE_DID_UNLOAD, function(page) {});

    // ----------------------------------------------------------------------
    // 페이지가 변경 될 때 ...
    // ----------------------------------------------------------------------
    Toast.on(Toast.Events.WILL_MOVE_PAGE, function(page, totalPage) {});
    
    // ----------------------------------------------------------------------
    // 페이지가 변경 되었을때 ...
    // ----------------------------------------------------------------------
    Toast.on(Toast.Events.PAGE_DID_CHANGE, function(page, totalPage) {});

    // ----------------------------------------------------------------------
    // 북마크 상태가 변경되었을때 ...
    // ----------------------------------------------------------------------
    Toast.on(Toast.Events.BOOKMARK_DID_CHANGE, function(bookmarks) {});
    
    // ----------------------------------------------------------------------
    // 확대/축소 상태가 변경되었을때 ...
    // ----------------------------------------------------------------------
    Toast.on(Toast.Events.ZOOM_MODE_DID_CHANGE, function(isOn) {});

    // ----------------------------------------------------------------------
    // 디바이스 방향 전환이 되었을때...
    // ----------------------------------------------------------------------
    Toast.on(Toast.Events.ORIENTATION_DID_CHANGE, function(orientation) {});
   
    // --------------------------------------------------------------------//
    // ----------------------------- 테마 API -----------------------------//
    // --------------------------------------------------------------------//
    // ----------------------------------------------------------------------
    // 테마 로드/언로드
    // ----------------------------------------------------------------------
    
    exports.load = function(baseUrl) {
        _$tbar = Toast.$navbar.find('.btn-toolbar').not('.btn-small-toolbar');
        _$tbar.css('width', $('.book').width() + 'px');
        $(window).on('resize', _onWindowResize);
    }
    exports.unload = function() {}
    exports.hasMobileStyleSheet = function() { return true; }

    // ----------------------------------------------------------------------
    // Private functions
    // ----------------------------------------------------------------------
    function _setTopButtonBalance() {

        var $leftBtnGroup = _$tbar.find('.left-btn-group');
        var $rightBtnGroup = _$tbar.find('.right-btn-group');
        var leftBtnCount = $leftBtnGroup.children('.btn:visible').length;
        var rightBtnCount = $rightBtnGroup.children('.btn:visible').length;
        var $noEventBtn = $('<button />', { 'class': 'btn btn-balance no-events', 'command': '__' });

        if (leftBtnCount>rightBtnCount)  {
            for (var i = 0; i < leftBtnCount - rightBtnCount; i++) {
                $rightBtnGroup.append($noEventBtn.clone());
            }
        } else {
            for (var i = 0; i < rightBtnCount - leftBtnCount; i++) {
                $leftBtnGroup.prepend($noEventBtn.clone());
            }
        }
    }

    function _viewLayout() {
        var $book = $('.book');
        if(!Toast.isMobileDevice) {
            var w = $book.width();
            _$tbar.css('width', w + 'px');
        } else {
            _$tbar.css('width', '100%');
        }
    }

    function _onWindowResize(event) {
        Toast.lazy(function(){
            _viewLayout();
        }, 5);
    }

    // ----------------------------------------------------------------------
    // 토스트가 준비 완료됨 ...
    // ----------------------------------------------------------------------
    Toast.ready(function() {

        _setTopButtonBalance();
        _viewLayout();
    });
});