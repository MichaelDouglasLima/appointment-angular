import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfessionalService } from 'src/app/core/services/professional.service';
import { ToastService } from 'src/app/core/services/toast.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AreaService } from 'src/app/core/services/area.service';
import { Area } from 'src/app/core/models/area';

@Component({
  selector: 'app-professional-form-page',
  templateUrl: './professional-form-page.component.html',
  styleUrls: ['./professional-form-page.component.css'],
})
export class ProfessionalFormPageComponent implements OnInit {
  professionalForm: FormGroup;
  isEditing: boolean = false;
  areas: Area[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private professionalService: ProfessionalService,
    private areaService: AreaService,
    private toastService: ToastService,
    private location: Location,
    private activatedRouter: ActivatedRoute,
    private router: Router,
  ) {
    this.professionalForm = this.formBuilder.group({
      id: [''],
      name: ['', [Validators.required, Validators.minLength(3)]],
      phone: ['', [Validators.required]],
      active: [null, [Validators.required]],
      areaId: [''],
    });
  }

  ngOnInit(): void {
    this.activatedRouter.paramMap.subscribe((params) => {
      let professionalId = Number(params.get('id') ?? '0');

      if (professionalId) {
        this.loadProfessional(professionalId);
        this.isEditing = true;
      }
    });
    this.loadAreas();
  }

  loadProfessional(professionalId: number) {
    this.professionalService.getProfessionalById(professionalId).subscribe({
      next: (professional) => {
        this.professionalForm.setValue(professional);
      },
      error: () => {
        this.toastService.show(
          'Ocorreu um erro ao carregar as informações do profissional!',
          {
            classname: 'bg-danger text-light',
          },
        );
      },
    });
  }

  loadAreas() {
    this.areaService.getAreas().subscribe({
      next: (areas) => {
        this.areas = areas;
      },
      error: () => {
        this.toastService.show('Erro ao carregar as áreas!', {
          classname: 'bg-danger text-light',
        });
      },
    });
  }

  cancel() {
    // this.location.back();
    this.router.navigate(['/professionals-table']);
  }

  save() {
    if (this.isEditing) {
      this.update();
    } else {
      this.create();
    }
  }

  private create() {
    if (this.professionalForm.valid) {
      this.professionalService.create(this.professionalForm.value).subscribe({
        next: () => {
          this.toastService.show('Profissional salvo com sucesso!', {
            classname: 'bg-success text-light',
          });
          // this.location.back();
          this.router.navigate(['/professionals-table']);
        },
        error: () => {
          this.toastService.show('Erro ao criar um profissional!', {
            classname: 'bg-danger text-light',
          });
        },
      });
    }
  }

  private update() {
    if (this.professionalForm.valid) {
      this.professionalService.update(this.professionalForm.value).subscribe({
        next: () => {
          this.toastService.show('Profissional atualizado com sucesso!', {
            classname: 'bg-success text-light',
          });
          // this.location.back();
          this.router.navigate(['/professionals-table']);
        },
        error: () => {
          this.toastService.show('Erro ao atualizar um profissional!', {
            classname: 'bg-danger text-light',
          });
        },
      });
    }
  }

  get pfName() {
    return this.professionalForm.get('name');
  }

  get pfPhone() {
    return this.professionalForm.get('phone');
  }

  get pfActive() {
    return this.professionalForm.get('active');
  }
}
