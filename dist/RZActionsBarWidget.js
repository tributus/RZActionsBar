/**
 * Created by anderson.santos on 21/06/2016.
 */
rz.widgets.ActionsBarWidgetHelpers = {};
/**
 * Created by anderson.santos on 21/06/2016.
 */
rz.widgets.ActionsBarWidgetHelpers.ActionsBarInterface = ["disable","enable","hide","show"];
rz.widgets.ActionsBarWidgetHelpers.ActionsBarEvents = ["action-raised"];

/**
 * Created by anderson.santos on 21/06/2016.
 */
rz.widgets.ActionsBarWidgetHelpers.ActionsBarRenderers = {
    renderers:{},
    registerRenderer: function(n,r){
        this.renderers[n] = r;
    },
    renderAction: function(n,p,c){
        return this.renderers[n].render(p,c);
    },
    initializeAction: function(n,i,s,p,a){
        this.renderers[n].initialize(i,s,p,a);
    },
    doAction: function(n,a,t,p,c){
        this.renderers[n].doAction(a,t,p,c);
    }
};
/**
 * Created by anderson.santos on 21/06/2016.
 */
rz.widgets.ActionsBarWidget = ruteZangada.widget("rz-actions-bar",
    rz.widgets.ActionsBarWidgetHelpers.ActionsBarInterface,
    rz.widgets.ActionsBarWidgetHelpers.ActionsBarEvents,function () {
        var $this = this;
        $this.elementsToInitialize = [];
        $this.actionsMapping = {};
        $this.renderHelpers = rz.widgets.ActionsBarWidgetHelpers.ActionsBarRenderers;
        this.initialize = function(p, initialized){
            var elementID = generateRandomID(8);
            var defaultParams = {
                elementID : elementID,
                ui:{
                    rootElementClass:"ui flat segment"
                },
                items:[]
            };
            $this.params = $.extend(true, {}, defaultParams, p);
            initialized();
        };

        var renderActionElements = function(sb){
            if($this.params.items !==undefined && $this.params.items.length > 0){
                $this.params.items.forEach(function(item){
                    var renderer = item.renderer || "button";
                    var html = $this.renderHelpers.renderAction(renderer,item,function(itemID){
                        $this.elementsToInitialize.push({renderer:item, id:itemID});
                        $this.actionsMapping[item.action] = {
                            elID:itemID,
                            params:item
                        }
                    });
                    sb.appendFormat(html);
                });
            }
        };

        var executePostRenderScripts = function(){
            $this.elementsToInitialize.forEach(function(e){
                var renderer = e.renderer.renderer || "button";
                $this.renderHelpers.initializeAction(renderer,e.id,$this,e.renderer,emitAction);
            });
            $this.elementsToInitialize = [];
        };
        var emitAction = function(s,e){
            $this.raiseEvent("action-raised",e,$this);
        };

        var mergeParams = function(params,userParams){
            if(userParams !==undefined){
                if(params==undefined){
                    params={};
                }
                params.userParams = userParams;
            }
            return params;
        };

        this.render = function (target,params,renderDOMElement){
            var sb = new StringBuilder();
            sb.appendFormat('<div id="{0}_actionsbar" class="{1} rz-actionsbarwidget">',$this.params.elementID,$this.params.ui.rootElementClass);
            renderActionElements(sb);
            sb.appendFormat('</div>');
            renderDOMElement({
                sender:$this,
                target:"#" + target,
                data:sb,
                method:"html",
                doAfterRenderAction:executePostRenderScripts
            });
            //$("#" + target).html(sb.toString());
            //executePostRenderScripts();
        };
        
        this.disable = function(action){
            $this.updateAction(action,"disable");
        };
        this.enable = function(action){
            $this.updateAction(action,"enable");
        };
        this.hide = function(action){
            $this.updateAction(action,"hide");
        };
        this.show = function(action){
            $this.updateAction(action,"show");
        };
        this.updateAction = function(action,updateCommand,params,callback){
            var map = $this.actionsMapping[action];
            if(map!==undefined){
                var p = mergeParams(map.params,params);
                $this.renderHelpers.doAction(map.params.renderer || "button",updateCommand,map.elID,p,callback);
            }
        };
});