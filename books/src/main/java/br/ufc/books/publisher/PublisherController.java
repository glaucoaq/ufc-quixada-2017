package br.ufc.books.publisher;

import static org.springframework.web.bind.annotation.RequestMethod.DELETE;
import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;
import static org.springframework.web.bind.annotation.RequestMethod.PUT;

import java.net.URI;
import br.ufc.books.publication.Publication;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/publishers")
public class PublisherController {

  @Autowired
  private PublisherRepository repository;

  @RequestMapping(method = GET)
  public Iterable<Publisher> getAll() {
    return repository.findAll();
  }

  @RequestMapping(method = GET, path = "{id}")
  public ResponseEntity<Publisher> getById(@PathVariable Integer id) {
    Publisher publisher = repository.findOne(id);

    if (publisher == null) {
      return ResponseEntity.notFound().build();
    }

    return ResponseEntity.ok(publisher);
  }

  @RequestMapping(method = POST)
  public ResponseEntity<Void> createPublisher(@RequestBody Publisher info) {
    try {
      repository.save(info);
    } catch (DataIntegrityViolationException ex) {
      return ResponseEntity.status(HttpStatus.CONFLICT).build();
    }
    URI createdUri = URI.create("/publishers/" + info.getId().toString());
    return ResponseEntity.created(createdUri).build();
  }

  @RequestMapping(method = PUT, path = "{id}")
  public ResponseEntity<Void> updatePublisher(@PathVariable Integer id, @RequestBody Publisher info) {
    if (!id.equals(info.getId())) {
      return ResponseEntity.badRequest().build();
    }

    try {
      repository.save(info);
    } catch (DataIntegrityViolationException e) {
      return ResponseEntity.status(HttpStatus.CONFLICT).build();
    }

    return ResponseEntity.noContent().build();
  }

  @RequestMapping(method = DELETE, path = "{id}")
  public ResponseEntity<Void> removePublisher(@PathVariable Integer id) {
    Publisher publisher = repository.findOne(id);
    if (publisher == null) {
      return ResponseEntity.notFound().build();
    }

    try {
      repository.delete(publisher);
    } catch (DataIntegrityViolationException e) {
      return ResponseEntity.status(HttpStatus.CONFLICT).build();
    }

    return ResponseEntity.noContent().build();
  }

  @RequestMapping("{id}/pubs")
  public ResponseEntity<Iterable<Publication>> getPublisherPublications(
      @PathVariable Integer id) {
    Publisher publisher = repository.findOne(id);
    if (publisher == null) {
      return ResponseEntity.notFound().build();
    }

    return ResponseEntity.ok(publisher.getPublications());
  }

}
