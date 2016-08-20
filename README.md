# ftStudioWebIndex
Feitian Studio Web Index JS and CSS

div id index-main

index_main.js
index_main.css

X for banner index

top:
	id: banner0
	class: top-banner

	back:
		id: banner0-back
	logo:
		id: banner0-logo

banner:
	id: bannerX
	class: banner CustomName

	back:
		id: bannerX-back
		class: banner-child

	title:
		~
	front:
		id: bannerX-frontY
	control:
		~
		
		button:
			id: bannerX-button
			class: banner-button

interface:
	tellSidebar_BannerOnload(id, name)
	tellSidebar_AllBannerOnload()
	tellSidebar_OnWhichBanner(id, name)
