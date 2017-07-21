package br.ufc.books.publisher;

import static javax.persistence.GenerationType.AUTO;

import java.util.Collection;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import br.ufc.books.publication.Publication;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

@Data
@Entity
public class Publisher {

  @Id
  @GeneratedValue(strategy = AUTO)
  private Integer id;

  @Column(unique = true)
  private String name;

  private String city;

  private String country;

  @OneToMany(mappedBy = "publisher")
  @JsonIgnore
  private Collection<Publication> publications;

}
