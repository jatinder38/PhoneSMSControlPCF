Fluent UI Consent-Aware Phone Control for Dynamics 365 -
This PowerApps Control Framework (PCF) solution is designed to enhance the standard phone number input.

Features:
1. Advanced Configuration & Flexibility: This control is designed to be highly modular. It recognizes that "Consent Management" and "Data Formatting" are two different business requirements that often, but not always, overlap.

2. Modular Feature Set: Consent-Driven UI: Bind the visibility of Call/SMS action icons to any Boolean/Two-Option field in your CDS/Dataverse environment.

3. Optional Formatting Engine: The international prefixing and RegEx formatting logic can be toggled On/Off via the control configuration properties in the Power Apps Studio.

4. Fallback Mode: When formatting is disabled, the control acts as a "Strict Consent" wrapper for the standard text input, preserving the raw data exactly as entered.

5. Fluent UI Icons: Leverage the Phone and Send icons from the Fluent system for a look that is indistinguishable from first-party Microsoft controls.

6. Logical Inversion Toggle: Provides a configuration setting to flip boolean triggers. This allows the control to support both "Negative Consent" (e.g., Do Not Allow SMS) and "Positive Consent" (e.g., Opted-in to SMS) architectures without code changes.

Real-Life Use Cases:
1. Accidental Dialing Prevention: In a fast-paced call center or field service environment, a rep might tap a phone icon out of habit. If the customer has withdrawn consent, this control ensures the button simply isn't there to be tapped.
   
2. Legal "Safety Net": Instead of training staff to "look for the checkbox before calling," the system enforces the rule for them. No checkbox = No button.

3. Data Consistency (Optional): If a team needs phone numbers to look uniform (e.g., always starting with +1 or +44), the formatting can be turned on. If they prefer to type freely, it can be turned off.
