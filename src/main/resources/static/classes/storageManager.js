export class StorageManager {
    static storageType = {};

    constructor(storage) {
        this.storage = storage;
        this.accountKey = "account";
        this.productKey = "product";
    }

    static getInstance(storage) {
        //checks for typeof, if we pass a storage that is already instantiated but altered. it would make a new one
        console.log(typeof StorageManager.storageType[storage]);
        if (!StorageManager.storageType[storage]) {
            console.log(`no ${storage} defined`);
            StorageManager.storageType[storage] = new StorageManager(storage);
        } else {
            console.log(`${storage} already defined`);
        }
        return StorageManager.storageType[storage];
    }

    getAccount() {
        return this.storage.getItem(this.accountKey);
    }

    setAccount(account) {
        this.storage.setItem(this.accountKey, account);
    }

    getProducts() {
        return this.storage.getItem(this.productKey);
    }

    setProducts(products) {
        this.storage.setItem(this.productKey, products);
    }
}