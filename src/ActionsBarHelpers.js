/**
 * Created by anderson.santos on 21/06/2016.
 */
rz.widgets.ActionsBarWidgetHelpers.ActionsBarRenderers = {
    extensionType:"rutezangada.widgets.RZActionsBar.ActionRenderer",
    renderAction: function(n,p,c){
        return rz.widgets.extensions.getExtension(n,this.extensionType).render(p,c);
        //return this.renderers[n].render(p,c);
    },
    initializeAction: function(n,i,s,p,a){
        return rz.widgets.extensions.getExtension(n,this.extensionType).initialize(i,s,p,a);
    },
    doAction: function(n,a,t,p,c){
        return rz.widgets.extensions.getExtension(n,this.extensionType).doAction(a,t,p,c);
    }
};