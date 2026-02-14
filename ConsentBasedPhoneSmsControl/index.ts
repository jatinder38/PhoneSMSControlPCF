import { IInputs, IOutputs } from "./generated/ManifestTypes";
import * as React from 'react';
import { ConsentBasedPhoneSmsComponent, ICallSmsProps } from "./ConsentBasedPhoneSmsComponent";

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
        this._currentValue = context.parameters.phoneNumber.raw;
    }

    public updateView(context: ComponentFramework.Context<IInputs>): React.ReactElement {
        const incomingValue = context.parameters.phoneNumber.raw;
        // Only update internal tracking if the value changed from the server/form
        if (this._currentValue !== incomingValue) {
            this._currentValue = incomingValue;
        }

        const props: ICallSmsProps = {
            phoneNumber: this._currentValue || "",
            placeholder: context.parameters.placeholderText.raw || "",
            useFormatting: context.parameters.useFormatting.raw,
            hidePhone: context.parameters.doNotAllowPhone.raw === true,
            hideSMS: context.parameters.doNotAllowSMS.raw === true,
            isDisabled: context.mode.isControlDisabled,
            
            onPhoneClick: () => {
                if (this._currentValue) {
                    // Clean symbols for the URL protocol
                    context.navigation.openUrl(`tel:${this._currentValue.replace(/[^0-9+]/g, '')}`);
                }
            },
            onSmsClick: () => {
                if (this._currentValue) {
                    context.navigation.openUrl(`sms:${this._currentValue.replace(/[^0-9+]/g, '')}`);
                }
            },
            onChange: (newValue: string) => {
                if (this._currentValue !== newValue) {
                    this._currentValue = newValue;
                    this._notifyOutputChanged();
                }
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