import { BaseComponent } from '../BaseComponent';
import { load as Load, LoadOptions } from 'ui/builder';

export class SaveComponent extends BaseComponent {
    private _callback: any;
    constructor() {
        super();
        this._viewModel.set('description', 'Guardar registro');
        this._viewModel.set('onSave', () => {
            if (this._callback) {
                console.log('on trigger callback');
                this.saveBtnDisabled();
                this._callback(true);
            }
        });
        this._viewModel.set('enabledBackground', '#0D47A1');
        this._viewModel.set('enabledColor', 'white');
        this.saveBtnEnabled();
        this._viewModel.set('onCancel', () => {
            if (this._callback) {
                console.log('on trigger callback')
                this._callback(false);
            }
        });

        this._theme.addChild(Load({ name: 'theme', path: '~/PlantDashboard/Components/SaveComponent' }));
    }


    public get callback(): any {
        return this._callback;
    }

    public set callback(value: any) {
        this._callback = value;
    }

    public saveBtnEnabled() {
        this._viewModel.set('enabledBtn', true);
        this._viewModel.set('saveBtnText', 'guardar');
    }

    public saveBtnDisabled() {
        this._viewModel.set('enabledBtn', false);
        this._viewModel.set('saveBtnText', 'guardando ...');
    }

    public toggleSaveBtn() {
        if (this._viewModel.get('enabledBtn')) {
            this._viewModel.set('enabledBtn', false);
            this._viewModel.set('saveBtnText', 'guardando ...');
        } else {
            this._viewModel.set('enabledBtn', true);
            this._viewModel.set('saveBtnText', 'guardar');
        }
    }

}