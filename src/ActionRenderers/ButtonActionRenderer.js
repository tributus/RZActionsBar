/**
 * Created by anderson.santos on 21/06/2016.
 */
rz.widgets.ActionsBarWidgetHelpers.ActionsBarRenderers.registerRenderer("button",{
    renderHelpers:{
        setActionsData: function(d){
            if(d!==undefined){
                return btoa(JSON.stringify(d));
            }
            else{
                return ""
            }
        },
        getActionData:function(d){
            if(d===undefined || d==""){
                return undefined;
            }
            else{
                return JSON.parse(atob(d));
            }
        }
    },
    render:function(params,registerElement){
        var uid = generateRandomID(18);
        var sb = new StringBuilder();
        sb.appendFormat('<{5} id="{1}" {6}data-action="{3}" data-action-params="{4}" class="ui {2} button">{0}</{5}>',
            params.text,
            uid,
            params.cssClass || "default",
            params.action,
            this.renderHelpers.setActionsData(params.actionData),
            (params.renderTag=="a")?'a':'button',
            (params.renderTag=="a")?'href="#"' : ':'
        );
        registerElement("#" + uid);
        return sb.toString();
    },
    initialize:function(id,sender,renderParams,actionHandler){
        var $this = this;
        $(id).click(function(e){
            var el = $(e.currentTarget);
            var ad = el.data("action-params");
            var eventArgs = {
                action: el.data("action"),
                actionData: $this.renderHelpers.getActionData(ad),
                domEl:e
            };
            actionHandler(sender,eventArgs);
            return false;
        });
    },
    doAction:function(action,el,params,callback){
        switch(action){
            case "disable":$(el).attr("disabled","disabled").addClass("disabled"); break;
            case "enable":$(el).removeAttr("disabled").removeClass("disabled"); break;break;
            case "show":$(el).show(); break;
            case "hide": $(el).hide(); break;
        }
        if(callback !==undefined) callback();
    }
});