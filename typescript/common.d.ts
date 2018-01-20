interface ClassConstructor<T> extends Function {
    new(...any): T;
    prototype: T;
}