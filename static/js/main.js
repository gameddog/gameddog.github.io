jQuery(document).ready(function($){
	var secondaryNav = $('.cd-secondary-nav'),
		secondaryNavTopPosition = secondaryNav.offset().top,
		taglineOffesetTop = $('#cd-intro-tagline').offset().top + $('#cd-intro-tagline').height() + parseInt($('#cd-intro-tagline').css('paddingTop').replace('px', '')),
		contentSections = $('.cd-section');
	
	$(window).on('scroll', function(){
		//在桌面上-指定一个固定到徽标和操作按钮的位置，并将它们移到视口外
		( $(window).scrollTop() > taglineOffesetTop ) ? $('#cd-logo, .cd-btn').addClass('is-hidden') : $('#cd-logo, .cd-btn').removeClass('is-hidden');
		
		//在桌面上-修复滚动时的辅助导航
		if($(window).scrollTop() > secondaryNavTopPosition ) {
			//fix secondary navigation
			secondaryNav.addClass('is-fixed');
			//按下按钮 .cd-main-content 给它一个 top-margin
			$('.cd-main-content').addClass('has-top-margin');	
			///在Firefox上，当父元素更改位置属性时，CSS转换/动画失败
			//因此，我们需要在改变二次导航子对象的位置值后，再改变二次导航子对象的属性
			setTimeout(function() {
	            secondaryNav.addClass('animate-children');
	            $('#cd-logo').addClass('slide-in');
				$('.cd-btn').addClass('slide-in');
	        }, 50);
		} else {
			secondaryNav.removeClass('is-fixed');
			$('.cd-main-content').removeClass('has-top-margin');
			setTimeout(function() {
	            secondaryNav.removeClass('animate-children');
	            $('#cd-logo').removeClass('slide-in');
				$('.cd-btn').removeClass('slide-in');
	        }, 50);
		}

		//在桌面上-更新辅助固定导航中的活动链接
		updateSecondaryNavigation();
	});

	function updateSecondaryNavigation() {
		contentSections.each(function(){
			var actual = $(this),
				actualHeight = actual.height() + parseInt(actual.css('paddingTop').replace('px', '')) + parseInt(actual.css('paddingBottom').replace('px', '')),
				actualAnchor = secondaryNav.find('a[href="#'+actual.attr('id')+'"]');
			if ( ( actual.offset().top - secondaryNav.height() <= $(window).scrollTop() ) && ( actual.offset().top +  actualHeight - secondaryNav.height() > $(window).scrollTop() ) ) {
				actualAnchor.addClass('active');
			}else {
				actualAnchor.removeClass('active');
			}
		});
	}

	//在移动设备上-打开/关闭辅助导航单击/轻触 .cd-secondary-nav-trigger
	$('.cd-secondary-nav-trigger').on('click', function(event){
		event.preventDefault();
		$(this).toggleClass('menu-is-open');
		secondaryNav.find('ul').toggleClass('is-visible');
	});

	//单击辅助导航项时平滑滚动
	secondaryNav.find('ul a').on('click', function(event){
        event.preventDefault();
        var target= $(this.hash);
        $('body,html').animate({
        	'scrollTop': target.offset().top - secondaryNav.height() + 1
        	}, 400
        ); 
        //移动-关闭辅助导航
        $('.cd-secondary-nav-trigger').removeClass('menu-is-open');
        secondaryNav.find('ul').removeClass('is-visible');
    });

    //在移动设备上-打开/关闭主导航单击/轻触菜单图标
	$('.cd-primary-nav').on('click', function(event){
		if($(event.target).is('.cd-primary-nav')) $(this).children('ul').toggleClass('is-visible');
	});
});