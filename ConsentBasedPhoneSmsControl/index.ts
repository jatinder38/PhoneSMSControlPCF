import { IInputs, IOutputs } from "./generated/ManifestTypes";
import * as React from 'react';
import { ConsentBasedPhoneSmsComponent, IPhoneSmsProps } from "./ConsentBasedPhoneSmsComponent";

export class ConsentBasedPhoneSmsControl implements ComponentFramework.ReactControl<IInputs, IOutputs> {
    private _notifyOutputChanged: () => void;
    private _currentValue: string | null;

    constructor() {}

    public init(
        context: ComponentFramework.Context<IInputs>, 
        notifyOutputChanged: () => void, 
        state: ComponentFramework.Dictionary
    ): void {
        this._notifyOutputChanged = notifyOutputChanged;
        // Initialize with current value
        this._currentValue = context.parameters.phoneNumber.raw;
    }

   public updateView(context: ComponentFramework.Context<IInputs>): React.ReactElement {
    this._currentValue = context.parameters.phoneNumber.raw;

    //Placeholder
    const placeholder = context.parameters.placeholderText.raw;
    const isMaskingEnabled = context.parameters.useMasking.raw; 
    const props: IPhoneSmsProps = {
        phoneNumber: this._currentValue || "",
        placeholder: placeholder || "",
        useMasking: context.parameters.useMasking.raw,
        hidePhone: context.parameters.doNotAllowPhone.raw === true,
        hideSMS: context.parameters.doNotAllowSMS.raw === true,
        isDisabled: context.mode.isControlDisabled,
        
        onPhoneClick: () => {
            if (this._currentValue) {
                context.navigation.openUrl(`tel:${this._currentValue.replace(/\s/g, '')}`);
            }
        },
        onSmsClick: () => {
            if (this._currentValue) {
                context.navigation.openUrl(`sms:${this._currentValue.replace(/\s/g, '')}`);
            }
        },
        onChange: (newValue: string) => {
            this._currentValue = newValue;
            this._notifyOutputChanged();
        }
    };

    return React.createElement(ConsentBasedPhoneSmsComponent, props);
}

    public getOutputs(): IOutputs {
        return {
            phoneNumber: this._currentValue || undefined 
        };
    }

    public destroy(): void {}
}