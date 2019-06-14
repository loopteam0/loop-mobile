/* SystemJS module definition */
declare var nodeModule: NodeModule;
interface NodeModule {
  id: string;
}

declare function __non_webpack_require__(path: string): any;
declare var window: Window;
interface Window {
  process: any;
  require: any;
}
