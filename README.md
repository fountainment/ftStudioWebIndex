# ftStudioWebIndex
Feitian Studio Web Index JS and CSS

div id index-main

index-main.js
index-main.css

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
	tellSidebar_ItemOnload(id, name)
	tellSidebar_AllItemOnload()
	tellSidebar_OnScroll()

global var:
	g_language
