export interface ScanOptions {
      /**
       * A comma sep. string of barcode types: "QR_CODE,PDF_417"
       * Default: empty, so all types of codes can be scanned.
       */
      formats?: string;

      /**
       * The label of the button used to close the scanner.
       * Default: "Close".
       * iOS only.
       */
      cancelLabel?: string;

      /**
       * The message shown when looking for something to scan.
       * Default: "Place a barcode inside the viewfinder rectangle to scan it."
       * Android only.
       */
      message?: string;

      /**
       * Start the scanner with the front camera?
       * Default: false, so the back camera is used.
       * Android only.
       */
      preferFrontCamera?: boolean;

      /**
       * While scanning for a barcode show a button to flip to the other camera (front or back).
       * Default: false, so no flip button is shown.
       * Android only (on iOS the button is always shown).
       */
      showFlipCameraButton?: boolean;

      /**
       * Optionally lock the orientation to 'portrait' or 'landscape'.
       * Default: "sensor", which follows the current device rotation.
       * Android only.
       */
      orientation?: string;
    }

export interface BarcodeScanner {
    available(): Promise<boolean>;
    hasCameraPermission(): Promise<boolean>;
    scan(options: ScanOptions): Promise<any>;
    requestCameraPermission(): Promise<boolean>;
 }
export interface BarcodeResult {
    text:string;
    format?:string;
 }

export interface FindOneResponse{
    length:number;
    schema:any[];
    record:any
}

export interface FindRecordsResponse {
    page:number;
    pages:number;
    length:number;
    totalLength:number;
    schema:any[];
    items:any[];
}

export interface AttrProps{
    label: string;
    shortName: string;
}
export interface SchmProps {
    name: string;
    input: string;
    label: string;
    shortName: string;
    visualizaton: boolean;
    creatable: boolean;
    editable: boolean;
    validate: boolean;
}
export interface ListOfObj {
    id:string;
    string:string;
}
export interface SelectionListAttrProps extends AttrProps{
    options: ListOfObj[];
    formType?:string;
}

export interface ListOptionObject {
    backgroundColor:string;
    color:string;
    key:string;
    value?:string;
    index?:number;
    img?:string;
}
export interface NumberListAttrProps extends AttrProps{
    minVal:number;
    maxVal:number;
    floatOpt:string;
    unit:string;
}

