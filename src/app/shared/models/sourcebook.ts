export interface SourceBook {
  book: string;
  page?: number;
}

export interface ReferenceBook {
  name: string;
  abbrev: string;
  link: string;
  system: 'Cyberpunk 2020' | 'Cyberpunk Red' | 'Cybergeneration' | 'All';
}

export default SourceBook;
