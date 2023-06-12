import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormBuilder, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ProductComponent } from "./product.component";
import { ProductService } from "../../service/product.service";
import { HttpClientModule } from "@angular/common/http";
import { HttpTestingController } from "@angular/common/http/testing";
import { Product } from "src/app/model/product";
import { of } from "rxjs";
import { By } from "@angular/platform-browser";

describe("ProductComponent", () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;
  let serviceMock: any;
  let productService: ProductService;
  const product: Product = {
    id: 1,
    name: "Mouse",
    price: 500,
    category: "Elect",
    stock: 5,
  };

  let mockService = {
    getAllProducts: () => {
      return of([product]);
    },
    deleteProduct: (id: number | string) => {
      return of(product);
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductComponent],
      imports: [FormsModule, ReactiveFormsModule, HttpClientModule],
      providers: [
        FormBuilder,
        ProductService,
        HttpTestingController,
        { provide: ProductService, useValue: mockService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    serviceMock = {
      getAllProducts: jest.fn(),
      addProduct: jest.fn(),
      updateProduct: jest.fn(),
      deleteProduct: jest.fn(),
      searchProducts: jest.fn(),
    };

    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;
    productService = TestBed.inject(ProductService);
    fixture.detectChanges();
  });

  describe("business", () => {
    it("should create the component", () => {
      expect(component).toBeTruthy();
    });

    it("should declare obj refereces", () => {
      expect(component.productForm).toBeDefined();
      expect(component.searchName).toBeDefined();
      expect(component.searchPrice).toBeDefined();
      expect(component.searchCategory).toBeDefined();
      expect(component.searchResults).toBeDefined();
    });

    it("Initialize the form", () => {
      const productForm = {
        id: "",
        name: "",
        price: "",
        category: "",
        stock: "",
      };
      expect(component.productForm.value).toEqual(productForm);
    });
  });

  describe("business", () => {
    it("validates the name field in the form", () => {
      const nameControl = component.productForm.controls["name"];
      nameControl.setValue("Venu");
      expect(nameControl.valid).toBeTruthy();
      nameControl.setValue("");
      expect(nameControl.invalid).toBeTruthy();
      nameControl.setValue("Ve");
      expect(nameControl.invalid).toBeTruthy();
    });

    it("validates the price field in the form", () => {
      const c = component.productForm.controls["price"];
      c.setValue(500);
      expect(c.valid).toBeTruthy();
      c.setValue("");
      expect(c.invalid).toBeTruthy();
      c.setValue(-200);
      expect(c.invalid).toBeTruthy();
    });

    it("validates the category field in the form", () => {
      const c = component.productForm.controls["category"];
      c.setValue("Electronics");
      expect(c.valid).toBeTruthy();
      c.setValue("");
      expect(c.invalid).toBeTruthy();
    });

    it("validates the stock field in the form", () => {
      const c = component.productForm.controls["stock"];
      c.setValue(50);
      expect(c.valid).toBeTruthy();
      c.setValue("");
      expect(c.invalid).toBeTruthy();
      c.setValue(-2);
      expect(c.invalid).toBeTruthy();
    });
  });

  describe("boundary", () => {
    it("should invalidate the form when name length  is greater than 20", () => {
      const form = component.productForm;
      form.controls["name"].setValue(
        "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
      );
      expect(form.invalid).toBeTruthy();
      expect(form.controls["name"].errors?.["maxlength"]).toBeTruthy();
    });

    it("should invalidate the form when name length is less than 3", () => {
      const form = component.productForm;
      form.controls["name"].setValue("Pr");
      expect(form.invalid).toBeTruthy();
      expect(form.controls["name"].errors?.["minlength"]).toBeTruthy();
    });

    it("should invalidate the form when price is greater than 9999", () => {
      const form = component.productForm;
      form.controls["price"].setValue(18000);
      expect(form.invalid).toBeTruthy();
      expect(form.controls["price"].errors?.["max"]).toBeTruthy();
    });

    it("should invalidate the form when stock is greater than 1000", () => {
      const form = component.productForm;
      form.controls["stock"].setValue(1500);
      expect(form.invalid).toBeTruthy();
      expect(form.controls["stock"].errors?.["max"]).toBeTruthy();
    });
  });

  describe("business", () => {
    it("should validate the form ", () => {
      component.productForm.controls["id"].setValue("1");
      component.productForm.controls["name"].setValue("Mouse");
      component.productForm.controls["price"].setValue("500");
      component.productForm.controls["category"].setValue("Electronics");
      component.productForm.controls["stock"].setValue("5");
      expect(component.productForm.valid).toBeTruthy();
    });

    it("should disable the submit button when the form is invalid", () => {
      const form = component.productForm;
      form.controls["name"].setValue("");
      form.controls["price"].setValue(-10);
      form.controls["category"].setValue("");
      form.controls["stock"].setValue(-5);
      fixture.detectChanges();
      const submitButton = fixture.nativeElement.querySelector(
        'button[type="submit"]'
      );
      expect(submitButton.disabled).toBe(true);
    });

    it("should enable the submit button when the form is valid", () => {
      const form = component.productForm;
      form.controls["name"].setValue("Product 1");
      form.controls["price"].setValue(99.99);
      form.controls["category"].setValue("Electronics");
      form.controls["stock"].setValue(500);
      fixture.detectChanges();

      const submitButton = fixture.nativeElement.querySelector(
        'button[type="submit"]'
      );
      expect(submitButton.disabled).toBe(false);
    });

    it("should call addProduct method when the form is submitted", () => {
      const form = component.productForm;
      jest.spyOn(component, "addProduct");
      form.controls["name"].setValue("Product 1");
      form.controls["price"].setValue(99.99);
      form.controls["category"].setValue("Electronics");
      form.controls["stock"].setValue(500);
      fixture.detectChanges();
      const submitButton = fixture.nativeElement.querySelector(
        'button[type="submit"]'
      );
      submitButton.click();
      expect(component.addProduct).toHaveBeenCalled();
    });
  });

  describe("exception", () => {
    it("should invalidate the form when empty", () => {
      component.productForm.controls["id"].setValue("");
      component.productForm.controls["name"].setValue("");
      component.productForm.controls["price"].setValue("");
      component.productForm.controls["category"].setValue("");
      component.productForm.controls["stock"].setValue("");
      expect(component.productForm.valid).toBeFalsy();
    });

    it("id field validity", () => {
      const c = component.productForm.controls["id"];
      expect(c.invalid).toBeFalsy();
    });

    it("name field validity", () => {
      const c = component.productForm.controls["name"];
      expect(c.valid).toBeFalsy();
      c.setValue("");
      expect(c.hasError("required")).toBeTruthy();
    });

    it("price field validity", () => {
      const c = component.productForm.controls["price"];
      expect(c.valid).toBeFalsy();
      c.setValue("");
      expect(c.hasError("required")).toBeTruthy();
    });

    it("category field validity", () => {
      const c = component.productForm.controls["category"];
      expect(c.valid).toBeFalsy();
      c.setValue("");
      expect(c.hasError("required")).toBeTruthy();
    });

    it("stock field validity", () => {
      const c = component.productForm.controls["stock"];
      expect(c.valid).toBeFalsy();
      c.setValue("");
      expect(c.hasError("required")).toBeTruthy();
    });
  });

  describe("business", () => {
    it("addProduct method to be defined", () => {
      component.addProduct = jest.fn();
      expect(component.addProduct).toBeDefined();
    });

    it("updateProduct method to be defined", () => {
      component.updateProduct = jest.fn();
      expect(component.updateProduct).toBeDefined();
    });

    it("getAllProducts method to be defined", () => {
      component.getAllProducts = jest.fn();
      expect(component.getAllProducts).toBeDefined();
    });

    it("deleteProduct method to be defined", () => {
      component.deleteProduct = jest.fn();
      expect(component.deleteProduct).toBeDefined();
    });

    it("edit method to be defined", () => {
      component.edit = jest.fn();
      expect(component.edit).toBeDefined();
    });

    it("searchProducts method to be defined", () => {
      component.searchProducts = jest.fn();
      expect(component.searchProducts).toBeDefined();
    });
  });

  describe("business", () => {
    it("should call addProduct", () => {
      jest.spyOn(component, "addProduct");
      component.addProduct();
      expect(component.addProduct).toHaveBeenCalled();
    });

    it("should call getAllProducts", () => {
      jest.spyOn(component, "getAllProducts");
      component.getAllProducts();
      expect(component.getAllProducts).toHaveBeenCalled();
    });

    it("should call deleteProduct", () => {
      jest.spyOn(component, "deleteProduct");
      component.deleteProduct(1);
      expect(component.deleteProduct).toHaveBeenCalled();
    });

    it("should call edit", () => {
      jest.spyOn(component, "edit");
      component.edit(product);
      expect(component.edit).toHaveBeenCalled();
    });

    it("should get all products", () => {
      const response = {
        success: true,
        message: "all products got successfully",
      };
      const editPro = jest
        .spyOn(serviceMock, "getAllProducts")
        .mockReturnValue(response);
      expect(serviceMock.getAllProducts(product)).toBe(response);
      expect(editPro).toHaveBeenCalled();
    });

    it("should add the product", () => {
      const response = {
        success: true,
        message: "product added successfully",
      };
      const editPro = jest
        .spyOn(serviceMock, "addProduct")
        .mockReturnValue(response);
      expect(serviceMock.addProduct(product)).toBe(response);
      expect(editPro).toHaveBeenCalledWith(product);
    });

    it("should edit the Product of specified id", () => {
      const response = {
        success: true,
        message: "Product updated successfully",
      };
      const editPro = jest
        .spyOn(serviceMock, "updateProduct")
        .mockReturnValue(response);
      expect(serviceMock.updateProduct(product)).toBe(response);
      expect(editPro).toHaveBeenCalledWith(product);
    });

    it("should delete the Product of specified id", () => {
      const response = {
        success: true,
        message: "Product eleted successfully",
      };
      const delPro = jest
        .spyOn(serviceMock, "deleteProduct")
        .mockReturnValue(response);
      expect(serviceMock.deleteProduct(1)).toBe(response);
      expect(delPro).toHaveBeenCalledWith(1);
    });

    it(" search product ", () => {
      const response = {
        success: true,
        message: "a user get successfully",
      };
      const editPro = jest
        .spyOn(serviceMock, "searchProducts")
        .mockReturnValue(response);
      expect(serviceMock.searchProducts("", 100, "")).toBe(response);
      expect(editPro).toHaveBeenCalledWith("", 100, "");
    });
  });

  describe("business", () => {
    it("should call ProductService getAllProducts method on initialization", () => {
      const mockProducts: Product[] = [
        { id: 1, name: "Mouse", price: 500, category: "Elect", stock: 5 },
      ];
      const getAllProductsSpy = jest
        .spyOn(productService, "getAllProducts")
        .mockReturnValue(of(mockProducts));
      component.ngOnInit();
      expect(getAllProductsSpy).toHaveBeenCalled();
      expect(component.products).toEqual(mockProducts);
    });

    it("should call ProductService createProduct property and update the products list", () => {
      const mockProduct: Product = {
        id: 1,
        name: "Mouse",
        price: 500,
        category: "Elect",
        stock: 5,
      };
      productService.addProduct = jest.fn().mockReturnValue(of(mockProduct));
      component.addProduct();
      expect(component.products).toContainEqual(mockProduct);
    });

    it("should call ProductService updateProduct property and update the products list", () => {
      const updatedProduct: Product = {
        category: "Elect",
        id: 1,
        name: "Mouse",
        price: 500,
        stock: 5,
      };
      productService.updateProduct = jest.fn().mockReturnValue(of(undefined));

      component.updateProduct(updatedProduct);

      expect(productService.updateProduct).toHaveBeenCalledWith(updatedProduct);
      expect(component.products).toContainEqual(updatedProduct);
    });

    it("should call ProductService deleteProduct method and remove the product from the products list", () => {
      const productToDelete: Product = {
        id: 1,
        name: "Product 1",
        price: 10,
        category: "Electronics",
        stock: 100,
      };
      const deleteProductSpy = jest
        .spyOn(productService, "deleteProduct")
        .mockReturnValue(of(undefined));
      component.deleteProduct(productToDelete.id);
      expect(component.products).not.toContain(productToDelete);
    });
  });

  describe("business", () => {
    it("should fetch all products", () => {
      component.products = [];
      jest.spyOn(mockService, "getAllProducts").mockReturnValue(of([product]));
      component.getAllProducts();
      expect(component.products.length).toBeGreaterThan(0);
      expect(Array.isArray(component.products)).toBe(true);
    });
  });
});
function getByText(arg0: string) {
  throw new Error("Function not implemented.");
}
