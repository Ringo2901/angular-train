import {Component, inject} from '@angular/core';
import {FormsModule, NgForm} from "@angular/forms";
import {ProductModel} from "../../models/product.model";
import {ActivatedRoute} from "@angular/router";
import {ProductService} from "../../services/products.service";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-product-edit',
  standalone: true,
  imports: [
    FormsModule,
    NgIf
  ],
  templateUrl: './product-edit.component.html',
  styleUrl: './product-edit.component.css'
})
export class ProductEditComponent {
  product!: ProductModel;
  id: number = this.route.snapshot.params['id'];
  productService: ProductService = inject(ProductService);
  showSuccessMessage: boolean = false;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.productService.getProductById(this.id).subscribe(
      value => {
        this.product = value;
      }
    )
  }

  onSubmit(form: NgForm): void {
    if (form.valid) {
      const updatedProduct = {
        image: this.product.image,
        title: this.product.title,
        price: this.product.price.toString(),
        stock: this.product.stock.toString(),
        description: this.product.description
      };

      this.productService.updateProduct(updatedProduct, this.id).subscribe(
        value => {
          this.product = value;
          this.showSuccessMessage = true;
          setTimeout(() => {
            this.showSuccessMessage = false;
          }, 5000);
        }
      )
    }
  }

  validateStock(stock: any): void {
    const value = stock.value;
    const isInteger = Number.isInteger(+value);
    if (!isInteger) {
      stock.control.setErrors({pattern: true});
    }
  }
}
