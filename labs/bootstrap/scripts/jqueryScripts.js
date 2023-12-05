$(document).ready(function() {
    $(".pane .delete").click(function(e) {
        e.preventDefault(); 
        e.stopPropagation(); 

        var $parentPane = $(this).closest(".pane");

        $parentPane.animate({
            opacity: 0,
            height: 0,
            marginTop: 0,
            marginBottom: 0,
            paddingTop: 0,
            paddingBottom: 0
        }, "slow", function() {
            $parentPane.hide();
        });
    });
});
