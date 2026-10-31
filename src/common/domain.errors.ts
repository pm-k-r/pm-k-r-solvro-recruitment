export class ResourceNotFoundError extends Error {
  constructor(id: number) {
    super(`Resource with ID ${id} not found`);
    this.name = 'ResourceNotFoundError';
  }
}

export class RelatedResourceNotPresentError extends Error {
  constructor(detail?: string) {
    super(
      detail ?? 'Related resource of the given ID not present in the database',
    );
    this.name = 'RelatedResourceNotPresentError';
  }
}

export class ResourceAlreadyExistsError extends Error {
  constructor(detail?: string) {
    super(detail ?? 'The resource already exists in the database');
    this.name = 'ResourceAlreadyExistsError';
  }
}
