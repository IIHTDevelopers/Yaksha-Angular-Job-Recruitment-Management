import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ProductService } from "../../service/product.service";
import { Product } from "../../model/product";

@Component({
  selector: "app-product",
  templateUrl: "./product.component.html",
  styleUrls: ["./product.component.css"],
})
export class ProductComponent implements OnInit {
  productForm!: FormGroup;
  products!: Product[];

  showAdd!: boolean;
  showUpdate!: boolean;

  searchName!: string;
  searchPrice!: number;
  searchCategory!: string;
  searchResults!: any[];

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService
  ) {
    //If wont initialize disappers the all data displayed
    this.searchName = "";
    this.searchPrice = 0;
    this.searchCategory = "";
    this.searchResults = [];
  }

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      id: [""],
      name: [
        "",
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
        ],
      ],
      price: [
        "",
        [Validators.required, Validators.min(0), Validators.max(9999)],
      ],
      category: ["", Validators.required],
      stock: [
        "",
        [Validators.required, Validators.min(0), Validators.max(1000)],
      ],
    });
    this.showAdd = true;
    this.getAllProducts();
  }

  getAllProducts(): void {
    this.productService.getAllProducts().subscribe(
      (products: Product[]) => {
        this.products = products;
      },
      (error) => {
        console.error("Error:", error);
      }
    );
  }

  addProduct(): void {
    this.showAdd = true;
    this.showUpdate = false;
    if (this.productForm.invalid) {
      return;
    }

    const product: Product = {
      id: null,
      ...this.productForm.value,
    };

    this.productService.addProduct(product).subscribe(
      (newProduct: Product) => {
        this.productForm.reset();
        this.getAllProducts();
      },
      (error) => {
        console.error("Error:", error);
      }
    );
  }

  edit(prod: any) {
    this.showAdd = false;
    this.showUpdate = true;
    this.productForm.controls["id"].setValue(prod.id);
    this.productForm.controls["name"].setValue(prod.name);
    this.productForm.controls["price"].setValue(prod.price);
    this.productForm.controls["category"].setValue(prod.category);
    this.productForm.controls["stock"].setValue(prod.stock);
  }

  updateProduct(product: Product): void {
    this.productService.updateProduct(product).subscribe(
      () => {
        this.productForm.reset();
        this.getAllProducts();
      },
      (error) => {
        console.error("Error:", error);
      }
    );
  }

  deleteProduct(id: number): void {
    this.productService.deleteProduct(id).subscribe(
      () => {
        this.getAllProducts();
      },
      (error) => {
        console.error("Error:", error);
      }
    );
  }

  searchProducts(): void {
    const name = this.searchName;
    const price = this.searchPrice;
    const category = this.searchCategory;
    this.productService.searchProducts(name, price, category).subscribe(
      (result) => {
        this.searchResults = result;
      },
      (error) => {
        console.error("Error:", error);
      }
    );
  }
}
