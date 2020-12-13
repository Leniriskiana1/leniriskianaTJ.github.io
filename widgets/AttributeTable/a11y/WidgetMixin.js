// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.15/esri/copyright.txt and http://www.arcgis.com/apps/webappbuilder/copyright.txt for details.
//>>built
define("dojo/_base/declare dojo/_base/array dojo/_base/lang dojo/_base/html dojo/on dojo/aspect dojo/keys dijit/focus dojo/topic dojo/string jimu/utils jimu/LayoutManager".split(" "),function(A,w,g,r,k,B,f,u,y,z,h,C){return A(null,{_layoutManager:null,_focusedTab:null,focusToDisplay:!1,hasBeenActivated:!1,postCreate:function(){this.inherited(arguments);this._layoutManager=C.getInstance();this.focusToDisplay=!0;this.hasBeenActivated=this.config.initiallyExpand;this.own(k(this.domNode,"keydown",g.hitch(this,
function(a){r.hasClass(a.target,this.baseClass)&&a.keyCode===f.ENTER&&(this.focusToDisplay=!1,this.hasBeenActivated=!0,this.showing||(this.widgetManager.activateWidget(this),this._switchTable()))})));this.own(k(this.domNode,"focus",g.hitch(this,function(){h.isInNavMode()&&this.focusToDisplay&&!this.showing&&(this.widgetManager.activateWidget(this),this._switchTable())})));this.own(k(this.domNode,"blur",g.hitch(this,function(){h.isInNavMode()&&this.focusToDisplay&&this.showing&&(this.hasBeenActivated||
this._switchTable());this.focusToDisplay=!0;this.showing||(this.hasBeenActivated=!1)})));this.own(y.subscribe(this.id+"_table_created",g.hitch(this,function(a){this._applyA11y2Grid(a&&a.grid,a&&a.context)})),y.subscribe(this.id+"_toolbar_created",g.hitch(this,function(a){this._applyA11y2Toolbar(a&&a.toolbar,a&&a.context)})))},applyA11y:function(){this._isOnlyTable()&&r.removeAttr(this.domNode,"tabindex");this.switchBtn&&this.own(k(this.switchBtn,"keydown",g.hitch(this,function(a){a.keyCode===f.ENTER&&
(this._switchTable(),this.focusToDisplay=this.showing,this.__focus2WidgetNode())})));this.tabContainer&&this.tabContainer.hasChildren()?this._applyA11y2TabContainer(this.tabContainer):this.NoTableMessageDiv&&(r.setAttr(this.NoTableMessageDiv,{tabindex:"0"}),h.initFirstFocusNode(this.domNode,this.NoTableMessageDiv),h.initLastFocusNode(this.domNode,this.NoTableMessageDiv),this.own(k(this.NoTableMessageDiv,"keydown",g.hitch(this,function(a){a.keyCode===f.ESCAPE&&this.__escape2WidgetSwitch(a)}))),this._isOnlyTable()&&
u.focus(this.NoTableMessageDiv))},_applyA11y2TabContainer:function(a){if(a){var c=this,e=function(b){b&&(w.forEach(a.tablist.getChildren(),function(d){!d.active&&d.closeButton&&d.id!==b.id&&r.setAttr(d.closeNode,"tabindex",-1)}),r.setAttr(b.closeNode,"tabindex",0))},v=a.tablist.onkeydown;a.tablist.onkeydown=function(b,d){var l=null,m=!1;switch(b.keyCode){case f.LEFT_ARROW:case f.UP_ARROW:b._djpage||(l=!1);break;case f.PAGE_UP:b.ctrlKey&&(l=!1);break;case f.RIGHT_ARROW:case f.DOWN_ARROW:b._djpage||
(l=!0);break;case f.PAGE_DOWN:b.ctrlKey&&(l=!0);break;case f.HOME:for(var q=this.getChildren(),n=0;n<q.length;n++){var t=q[n];if(!t.disabled){u.focus(t.focusNode);c._focusedTab=t;break}}b.stopPropagation();b.preventDefault();break;case f.END:q=this.getChildren();for(n=q.length-1;0<=n;n--)if(t=q[n],!t.disabled){u.focus(t.focusNode);c._focusedTab=t;break}b.stopPropagation();b.preventDefault();break;case f.DELETE:case 87:this._currentChild.closable&&(b.keyCode==f.DELETE||b.ctrlKey)&&(b.stopPropagation(),
b.preventDefault());break;case f.ENTER:case f.SPACE:c.tabForwardStep=0;break;case f.ESCAPE:"Close"===b.target.title?c._focusedTab&&u.focus(c._focusedTab.focusNode):c.__escape2WidgetSwitch(b);b.stopPropagation();b.preventDefault();break;case f.TAB:if(c.isLoading()){b.stopPropagation();b.preventDefault();return}break;default:m=!0}if(null!==l){this.isLeftToRight()||this.tabPosition&&!/top|bottom/.test(this.tabPosition)||(l=!l);q=this.getChildren();n=w.indexOf(q,this.pane2button(c._focusedTab?c._focusedTab.page&&
c._focusedTab.page.id:this._currentChild.id));t=q[n];do{n=(n+(l?1:q.length-1))%q.length;var x=q[n]}while(x.disabled&&x!==t);c._focusedTab=x;u.focus(c._focusedTab.focusNode);b.stopPropagation();b.preventDefault()}m&&v.apply(this,arguments)};if(a.hasChildren()){w.forEach(a.getChildren(),g.hitch(this,function(b){b.controlButton.checked||r.setAttr(b.controlButton.focusNode,"aria-selected","false");b.closable&&r.setAttr(b.controlButton.closeNode,"role","button")}));var p=a.tablist.getChildren()[0];this._focusedTab=
p;h.initFirstFocusNode(this.domNode,p.focusNode);p.closeNode&&e(p);!this._isOnlyTable()||"LaunchpadTheme"!==this.appConfig.theme.name&&"BillboardTheme"!==this.appConfig.theme.name||u.focus(p.focusNode)}this.own(B.after(a,"selectChild",function(){var b=g.getObject("controlButton",!1,this.selectedChildWidget);b&&(h.initFirstFocusNode(c.domNode,b.focusNode),b.closeNode&&e(b));c._focusedTab=b}),k(a.tablist,"blur",g.hitch(this,function(){this._focusedTab=null})))}},_applyA11y2Toolbar:function(a,c){a&&
(g.mixin(a,{_onLeftArrow:function(){},_onRightArrow:function(){}}),this.own(k(a,"keydown",g.hitch(this,function(e){if(e.keyCode===f.TAB){if(e.shiftKey){if(e.target.id===a._getFirstFocusableChild().id)return}else if(e.target.id===a._getLastFocusableChild().id)return;e.shiftKey?a.focusPrev():a.focusNext();e.stopPropagation();e.preventDefault()}else e.keyCode===f.ESCAPE&&this.__escape2ActiveTab(e)}))),c&&c.toggleColumnsMenuItem&&this.own(k(c.toggleColumnsMenuItem,"click",g.hitch(this,function(e){h.isInNavMode()&&
this.__applyA11y2GridHiderMenu(this._activeTable&&this._activeTable.grid)}))))},_applyA11y2Grid:function(a,c){if(a&&a.hiderToggleNode&&a.hiderMenuNode){var e=a.hiderToggleNode,v=a.hiderMenuNode;h.initLastFocusNode(this.domNode,e);if(!a._customEvtHandlersInitialized){var p=c.id+"_ScreenReader_Node",b=r.create("div",{"class":"sr-only","aria-live":"assertive",id:p},c.footer,"after");this.own(k(c,"row-click",function(d){h.isInNavMode()&&(b.textContent=d.selectedIds.length+" "+this.nls.selected)}),k(c,
"clear-selection",function(){h.isInNavMode()&&(b.textContent="")}),k(a,"keydown",g.hitch(this,function(d){h.isInNavMode()&&d.keyCode===f.ESCAPE&&(b.textContent="",this.__escape2ActiveTab(d))})),u.watch("curNode",g.hitch(this,function(d,l,m){h.isInNavMode()&&m&&m.classList&&m.classList.contains("dgrid-column-selectionHandle")&&(d=-1,a.selection&&0===Object.keys(a.selection).length&&(d=this.__IndexOfGridRowHandle(m,a),-1<d&&(b.textContent="Row "+d+", Selection Handle.",m.setAttribute("aria-labelledby",
p))))})),k(a,"dgrid-select",g.hitch(this,function(d){d=u.curNode;if(h.isInNavMode()&&d&&d.classList&&d.classList.contains("dgrid-column-selectionHandle")){var l=(a.selection&&Object.keys(a.selection)).length,m=-1;0<l&&d&&(m=this.__IndexOfGridRowHandle(d,a),-1<m&&(b.textContent=1===l?z.substitute(this.nls.rowHeaderColumnTitle,{rowId:m}):z.substitute(this.nls.rowHeaderColumnTitleMultiple,{rowId:m,rowCount:l}),d.setAttribute("aria-labelledby",p)))}})),k(e,"keydown",g.hitch(this,function(d){if(d.keyCode===
f.SPACE||d.keyCode===f.ENTER)a._toggleColumnHiderMenu(),this.__applyA11y2GridHiderMenu(a),d.stopPropagation(),d.preventDefault()})),k(v,"keydown",g.hitch(this,function(d){d.keyCode===f.ESCAPE&&(e.focus(),a._hiderMenuOpened&&a._toggleColumnHiderMenu(d),d.stopPropagation(),d.preventDefault())})),k(a,".dgrid-header .dgrid-cell:keydown",g.hitch(this,function(d){d.keyCode===f.ENTER&&this._activeTable&&this._activeTable._onHeaderClick(d)})));a._customEvtHandlersInitialized=!0}this._focusedTab&&this._focusedTab.checked&&
c&&r.setAttr(this._focusedTab.focusNode,"aria-labelledby",this._focusedTab.focusNode.id+" "+this.id+"_"+c.id+"_footer")}},__escape2WidgetSwitch:function(a){this.switchBtn?this.switchBtn.focus():h.isDomFocusable(this.domNode)?this.__focus2WidgetNode():this._controllerDiv&&this._controllerDiv.focus();if(this.closeable&&this._isOnlyTable()&&this.widgetManager){var c;w.some(this._layoutManager&&this._layoutManager.layoutManager&&this._layoutManager.layoutManager.onScreenWidgetIcons,g.hitch(this,function(e){if(e&&
e.widgetConfig&&e.widgetConfig.id===this.id)return c=e,!0}));c?c.domNode.focus():this.widgetManager.closeWidget(this)}a&&(a.stopPropagation(),a.preventDefault())},__focus2WidgetNode:function(){this.domNode.focus()},__escape2ActiveTab:function(a){h.focusFirstFocusNode(this.domNode);a&&(a.stopPropagation(),a.preventDefault())},__applyA11y2GridHiderMenu:function(a){if(a&&a._hiderMenuOpened&&(a=a.hiderMenuNode,a.children&&0<a.children.length)){var c=a.children[0],e=a.children[a.children.length-1],v=c.querySelector("input");
h.initFirstFocusNode(a,c.querySelector("input"));h.initLastFocusNode(a,e.querySelector("input"));v&&v.focus()}},__focusOnActiveTab:function(){setTimeout(g.hitch(this,function(){h.focusFirstFocusNode(this.domNode)}),600)},__IndexOfGridRowHandle:function(a,c){var e;c=c.domNode.querySelectorAll(".dgrid-column-selectionHandle");w.some(c,function(v,p){if(v.isEqualNode(a))return console.log(p),e=p,!0});return e}})});