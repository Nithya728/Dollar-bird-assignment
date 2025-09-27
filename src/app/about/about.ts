import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-about',
  imports: [RouterModule,CommonModule],
  templateUrl: './about.html',
  styleUrl: './about.css'
})
export class About {
 teamMembers = [
    {
      name: 'John Doe',
      role: 'Founder & Lead Developer',
      bio: 'Full-stack developer with 8+ years of experience in Angular and web technologies.',
      avatar: '👨‍💻',
      social: {
        twitter: '#',
        github: '#',
        linkedin: '#'
      }
    },
    {
      name: 'Jane Smith',
      role: 'Content Strategist',
      bio: 'Technical writer passionate about making complex concepts accessible to everyone.',
      avatar: '👩‍🎓',
      social: {
        twitter: '#',
        github: '#',
        linkedin: '#'
      }
    },
    {
      name: 'Mike Johnson',
      role: 'UI/UX Designer',
      bio: 'Creative designer focused on creating intuitive and beautiful user experiences.',
      avatar: '👨‍🎨',
      social: {
        twitter: '#',
        github: '#',
        linkedin: '#'
      }
    }
  ];

  stats = [
    { number: '500+', label: 'Articles Published' },
    { number: '50K+', label: 'Monthly Readers' },
    { number: '100+', label: 'Expert Contributors' },
    { number: '3+', label: 'Years of Excellence' }
  ];

  features = [
    {
      icon: '📚',
      title: 'Comprehensive Tutorials',
      description: 'Step-by-step guides covering everything from basics to advanced topics.'
    },
    {
      icon: '⚡',
      title: 'Latest Technologies',
      description: 'Stay updated with the newest Angular features and best practices.'
    },
    {
      icon: '👥',
      title: 'Community Driven',
      description: 'Learn from real-world experiences shared by developers worldwide.'
    },
    {
      icon: '🔍',
      title: 'In-Depth Analysis',
      description: 'Detailed explanations that go beyond surface-level understanding.'
    }
  ];
}
