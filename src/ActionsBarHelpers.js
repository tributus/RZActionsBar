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