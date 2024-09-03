import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-nav-button',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, MatIconModule, MatButtonModule],
  templateUrl: './nav-button.component.html',
  styleUrl: './nav-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavButtonComponent {
  link = input.required<string>();
  label = input.required<string>();
  icon = input.required<string>();
}
