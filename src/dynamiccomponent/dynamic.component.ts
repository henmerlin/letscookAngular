import { Component, Input, ViewContainerRef, ViewChild, ReflectiveInjector, ComponentFactoryResolver } from '@angular/core';
import { LoginComponent } from '../login/login.component';

@Component({
    selector: 'dynamic-component',
    templateUrl: 'dynamic.component.html',
    entryComponents: [LoginComponent],
})

export class DynamicComponent {
    currentComponent = null;

    @ViewChild('dynamicComponentContainer', { read: ViewContainerRef }) dynamicComponentContainer: ViewContainerRef;

    @Input() set componentData(data: { component: any, inputs: any }) {
        //console.log(data);
        if (!data) {
            return;
        }
        let inputProviders = Object.keys(data.inputs).map((inputName) => { return { provide: inputName, useValue: data.inputs[inputName] }; });
        let resolvedInputs = ReflectiveInjector.resolve(inputProviders);
        let injector = ReflectiveInjector.fromResolvedProviders(resolvedInputs, this.dynamicComponentContainer.parentInjector);
        let factory = this.resolver.resolveComponentFactory(data.component);
        let component = factory.create(injector);
        this.dynamicComponentContainer.insert(component.hostView);
        if (this.currentComponent) {
            this.currentComponent.destroy();
        }
        this.currentComponent = component;
    }
    constructor(private resolver: ComponentFactoryResolver) { }
}