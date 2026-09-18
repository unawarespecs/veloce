package io.github.unawarespecs.veloce.entity;

import io.github.unawarespecs.veloce.enums.VehicleCategoryType;
import com.fasterxml.jackson.annotation.JsonFormat;
import io.github.unawarespecs.veloce.enums.VehicleFuelType;
import io.github.unawarespecs.veloce.enums.VehicleTransmissionType;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.hibernate.proxy.HibernateProxy;

import java.time.LocalDateTime;
import java.util.Objects;

@Getter
@Setter
@ToString
@RequiredArgsConstructor
@Entity
@Table(name = "vehicles")
public class VehicleData {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(nullable = false)
    Integer id;

    String brand;
    String model;
    @Column(nullable = false, scale = 2)
    double price;

    String name;
    VehicleCategoryType category;
    @Column(nullable = false, scale = 2)
    double dailyRate;
    int seats;
    VehicleTransmissionType transmission;
    VehicleFuelType fuel;
    String imagePath;
    String tag;

    @UpdateTimestamp
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+08:00")
    private LocalDateTime lastUpdated;

    @CreationTimestamp
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+08:00")
    private LocalDateTime created;

    @Override
    public final boolean equals(Object o) {
        if (this == o) return true;
        if (o == null) return false;
        Class<?> oEffectiveClass = o instanceof HibernateProxy ? ((HibernateProxy) o).getHibernateLazyInitializer().getPersistentClass() : o.getClass();
        Class<?> thisEffectiveClass = this instanceof HibernateProxy ? ((HibernateProxy) this).getHibernateLazyInitializer().getPersistentClass() : this.getClass();
        if (thisEffectiveClass != oEffectiveClass) return false;
        VehicleData that = (VehicleData) o;
        return getId() != null && Objects.equals(getId(), that.getId());
    }

    @Override
    public final int hashCode() {
        return this instanceof HibernateProxy ? ((HibernateProxy) this).getHibernateLazyInitializer().getPersistentClass().hashCode() : getClass().hashCode();
    }
}
